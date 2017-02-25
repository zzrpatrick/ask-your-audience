import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Poll } from "../../shared/poll/poll";
import { PollListService } from "../../shared/poll/poll-list.service";

@Component({
	selector: "list",
	templateUrl: "pages/list/list.html",
	styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
	providers: [PollListService]
})

export class ListComponent implements OnInit {
	pollList: Array<Poll> = [];

	constructor(private pollListService: PollListService) {}

	ngOnInit() {
		// this.pollListService.load()
		// .subscribe(loadedPolls => {
		// 	loadedPolls.forEach((pollObject) => {
		// 		this.pollList.unshift(pollObject);
		// 		});
		// });
		this.pollList = this.createMockPollList();
	}	

	public onItemTap(args) {
		var tappedPoll = args.view;
		var currentPoll = tappedPoll.bindingContext;
		console.log("Question with pollID = " + currentPoll.id + " tapped.");
		// console.log("Question with pollID = " + args.index + " tapped.");
	}

	createMockPollList() {
		var polls = [];

		for (var i = 0; i < 5; ++i) {
			polls.unshift(new Poll(i, "Question " + i, ["a1", "a2", "a3"], [i,i+1,i+2], "me"));
		}

		return polls;
	}
}