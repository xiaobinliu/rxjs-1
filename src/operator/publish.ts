import { Subject } from '../Subject';
import { Observable } from '../Observable';
import { multicast } from './multicast';
import { ConnectableObservable } from '../observable/ConnectableObservable';

/* tslint:disable:max-line-length */
export function publish<T>(this: Observable<T>): ConnectableObservable<T>;
export function publish<T>(this: Observable<T>, selector: selector<T>): Observable<T>;
/* tslint:disable:max-line-length */

/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * @param {Function} Optional selector function which can use the multicasted source sequence as many times as needed,
 * without causing multiple subscriptions to the source sequence.
 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
 * @return a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 * @method publish
 * @owner Observable
 */
export function publish<T>(this: Observable<T>, selector?: (source: Observable<T>) => Observable<T>): Observable<T> | ConnectableObservable<T> {
  return selector ? multicast.call(this, () => new Subject<T>(), selector) :
                    multicast.call(this, new Subject<T>());
}

export type selector<T> = (source: Observable<T>) => Observable<T>;
