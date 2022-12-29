import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public beginnerCourses$: Observable<Course[]>;
  public advancedCourse$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("http://localhost:9000/api/courses");

    const courses$: Observable<Course[]> = http$.pipe(
      // catchError((err) => {
      //   console.log("Error occured", err);

      //   return throwError(err);
      // }),
      // finalize(() => {
      //   console.log("Finalize executed...");
      // }),
      tap(() => console.log("HTTP request executed!")),
      map((res) => Object.values(res["payload"])),
      shareReplay(),
      // catchError((err) =>
      //   of([
      //     {
      //       id: 0,
      //       description: "RxJs In Practice Course",
      //       iconUrl:
      //         "https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png",
      //       courseListIcon:
      //         "https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png",
      //       longDescription:
      //         "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
      //       category: "BEGINNER",
      //       lessonsCount: 10,
      //     },
      //   ])
      // )
      retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000))))
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );
    this.advancedCourse$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );

    // courses$.subscribe(
    //   (courses) => {},
    //   noop, // empty callback () => {}
    //   () => console.log("completed")
    // );
  }
}
