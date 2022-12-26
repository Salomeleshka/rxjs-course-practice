import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  merge,
  noop,
  Observable,
  of,
  timer,
} from "rxjs";
import { map } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // callback HELL 🔥
    // document.addEventListener("click", (evt) => {
    //   console.log(evt);
    //   setTimeout(() => {
    //     console.log("finished...");
    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });
    // const interval$ = interval(1000);
    // interval$.subscribe((val) => console.log("stream 1 => " + val));
    // interval$.subscribe((val) => console.log("stream 2 => " + val));
    // const interval$ = timer(3000, 1000);
    // const sub = interval$.subscribe((val) => console.log("stream 1 => " + val));
    // setTimeout(() => sub.unsubscribe(), 5000);
    // const click$ = fromEvent(document, "click");
    // click$.subscribe(
    //   (evt) => console.log(evt),
    //   (err) => console.log(err),
    //   () => console.log("completed!")
    // );
    // const source1$ = interval(1000);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // const result$ = concat(source1$, source2$, source3$);
    // result$.subscribe(console.log);

    const interval1$ = interval(1000);

    const interval2$ = interval1$.pipe(map((val) => 10 * val));

    const result$ = merge(interval1$, interval1$);

    result$.subscribe(console.log);
  }
}
