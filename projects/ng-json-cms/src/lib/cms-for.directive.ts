/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, DoCheck, EmbeddedViewRef, Input, IterableChangeRecord, IterableChanges,
  IterableDiffer, IterableDiffers, NgIterable, TemplateRef, TrackByFunction, ViewContainerRef,
  forwardRef, isDevMode} from '@angular/core';

/**
 * @publicApi
 */
export class CmsForOfContext<T> {
  constructor(
      public $implicit: T, public cmsForOf: NgIterable<T>, public index: number,
      public count: number) {}

  get first(): boolean { return this.index === 0; }

  get last(): boolean { return this.index === this.count - 1; }

  get even(): boolean { return this.index % 2 === 0; }

  get odd(): boolean { return !this.even; }
}

@Directive({selector: '[cmsFor][cmsForOf]'})
export class CmsForOf<T> implements DoCheck {
  /**
   * The value of the iterable expression, which can be used as a
   * [template input variable](guide/structural-directives#template-input-variable).
   */
  @Input()
  set cmsForOf(cmsForOf: NgIterable<T>) {
    this._cmsForOf = cmsForOf;
    this._cmsForOfDirty = true;
  }
  /**
   * A function that defines how to track changes for items in the iterable.
   *
   * When items are added, moved, or removed in the iterable,
   * the directive must re-render the appropriate DOM nodes.
   * To minimize churn in the DOM, only nodes that have changed
   * are re-rendered.
   *
   * By default, the change detector assumes that
   * the object instance identifies the node in the iterable.
   * When this function is supplied, the directive uses
   * the result of calling this function to identify the item node,
   * rather than the identity of the object itself.
   *
   * The function receives two inputs,
   * the iteration index and the node object ID.
   */
  @Input()
  set ngForTrackBy(fn: TrackByFunction<T>) {
    if (isDevMode() && fn != null && typeof fn !== 'function') {
      // TODO(vicb): use a log service once there is a public one available
      if (<any>console && <any>console.warn) {
        console.warn(
            `trackBy must be a function, but received ${JSON.stringify(fn)}. ` +
            `See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.`);
      }
    }
    this._trackByFn = fn;
  }

  get ngForTrackBy(): TrackByFunction<T> { return this._trackByFn; }

  // TODO(issue/24571): remove '!'.
  private _cmsForOf !: NgIterable<T>;
  private _cmsForOfDirty: boolean = true;
  private _differ: IterableDiffer<T>|null = null;
  // TODO(issue/24571): remove '!'.
  private _trackByFn !: TrackByFunction<T>;

  constructor(
      private _viewContainer: ViewContainerRef, private _template: TemplateRef<CmsForOfContext<T>>,
      private _differs: IterableDiffers) {}

  /**
   * A reference to the template that is stamped out for each item in the iterable.
   * @see [template reference variable](guide/template-syntax#template-reference-variables--var-)
   */
  @Input()
  set ngForTemplate(value: TemplateRef<CmsForOfContext<T>>) {
    // TODO(TS2.1): make TemplateRef<Partial<NgForRowOf<T>>> once we move to TS v2.1
    // The current type is too restrictive; a template that just uses index, for example,
    // should be acceptable.
    if (value) {
      this._template = value;
    }
  }

  /**
   * Applies the changes when needed.
   */
  ngDoCheck(): void {
    if (this._cmsForOfDirty) {
      this._cmsForOfDirty = false;
      // React on cmsForOf changes only once all inputs have been initialized
      const value = this._cmsForOf;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this.ngForTrackBy);
        } catch {
          throw new Error(
              `Cannot find a differ supporting object '${value}' of type '${getTypeName(value)}'. NgFor only supports binding to Iterables such as Arrays.`);
        }
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._cmsForOf);
      if (changes) this._applyChanges(changes);
    }
  }

  private _applyChanges(changes: IterableChanges<T>) {
    const insertTuples: RecordViewTuple<T>[] = [];
    changes.forEachOperation(
        (item: IterableChangeRecord<any>, adjustedPreviousIndex: number, currentIndex: number) => {
          if (item.previousIndex == null) {
            const view = this._viewContainer.createEmbeddedView(
                this._template, new CmsForOfContext<T>(null !, this._cmsForOf, -1, -1), currentIndex);
            const tuple = new RecordViewTuple<T>(item, view);
            insertTuples.push(tuple);
          } else if (currentIndex == null) {
            this._viewContainer.remove(adjustedPreviousIndex);
          } else {
            const view = this._viewContainer.get(adjustedPreviousIndex) !;
            this._viewContainer.move(view, currentIndex);
            const tuple = new RecordViewTuple(item, <EmbeddedViewRef<CmsForOfContext<T>>>view);
            insertTuples.push(tuple);
          }
        });

    for (let i = 0; i < insertTuples.length; i++) {
      this._perViewChange(insertTuples[i].view, insertTuples[i].record);
    }

    for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<CmsForOfContext<T>>>this._viewContainer.get(i);
      viewRef.context.index = i;
      viewRef.context.count = ilen;
      viewRef.context.cmsForOf = this._cmsForOf;
    }

    changes.forEachIdentityChange((record: any) => {
      const viewRef =
          <EmbeddedViewRef<CmsForOfContext<T>>>this._viewContainer.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
    });
  }

  private _perViewChange(
      view: EmbeddedViewRef<CmsForOfContext<T>>, record: IterableChangeRecord<any>) {
    view.context.$implicit = record.item;
  }

  /**
   * Asserts the correct type of the context for the template that `CmsForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `CmsForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: CmsForOf<T>, ctx: any): ctx is CmsForOfContext<T> {
    return true;
  }
}

class RecordViewTuple<T> {
  constructor(public record: any, public view: EmbeddedViewRef<CmsForOfContext<T>>) {}
}

function getTypeName(type: any): string {
  return type['name'] || typeof type;
}
