"use strict";
var poll_1 = require("../shared/poll/poll");
describe("A poll", function () {
    it("contains valid information", function () {
        var poll = new poll_1.Poll(1, "Is this a question", ["no", "yes"], [0, 1], "nobody");
        expect(poll.id).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC1zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9sbC1zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSw0Q0FBMkM7QUFFM0MsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNmLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtRQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7fSBmcm9tICdqYXNtaW5lJztcclxuXHJcbmltcG9ydCB7IFBvbGwgfSBmcm9tICcuLi9zaGFyZWQvcG9sbC9wb2xsJztcclxuXHJcbmRlc2NyaWJlKFwiQSBwb2xsXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaXQoXCJjb250YWlucyB2YWxpZCBpbmZvcm1hdGlvblwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgcG9sbCA9IG5ldyBQb2xsKDEsIFwiSXMgdGhpcyBhIHF1ZXN0aW9uXCIsIFtcIm5vXCIsIFwieWVzXCJdLCBbMCwgMV0sIFwibm9ib2R5XCIpO1xyXG4gICAgICAgIGV4cGVjdChwb2xsLmlkKS50b0JlR3JlYXRlclRoYW4oMCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdfQ==