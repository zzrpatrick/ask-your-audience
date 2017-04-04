import { SideNavigationComponent } from './navigation-panel.component';

describe ('navigation-panel.component', () => {

    let testSideNav: SideNavigationComponent;

   beforeEach( () => {
      testSideNav = new SideNavigationComponent (null);
   });

   it ('addPoll: changes addDialog to true', () => {
      testSideNav.addDialog = false;
      testSideNav.addPoll();
      expect(testSideNav.addDialog).toBe(true); // false -> true
      testSideNav.addPoll();
      expect(testSideNav.addDialog).toBe(true); // true -> true
   })


   it ('close: changes addDialog to false', () => {
      testSideNav.addDialog = true;
      testSideNav.close();
      expect(testSideNav.addDialog).toBe(false); // true -> false
      testSideNav.close();
      expect(testSideNav.addDialog).toBe(false); // false -> false
   });

   it ('verifyPoll: undefined question, do nothing', () => {
      testSideNav.question = undefined;
      expect (testSideNav.verifyPoll()).toBe(-2);
   });

   it ('verifyPoll: null question, do nothing', () => {
      testSideNav.question = null;
      expect (testSideNav.verifyPoll()).toBe(-2);
   });

   it ('verifyPoll: If question is an empty string, do nothing', () => {
      testSideNav.question = "";
      expect (testSideNav.verifyPoll()).toBe(-2);
   });

   it ('verifyPoll: if (q1) but one option, do nothing', () => {
      testSideNav.question = 'A';
      testSideNav.tempArray[0] = 'b';
      expect(testSideNav.verifyPoll()).toBe(-1);
   });

   it ('verifyPoll: if (q1) but two options, one is empty, do nothing', () => {
      testSideNav.question = 'A';
      testSideNav.tempArray[1] = 'b';
      expect(testSideNav.verifyPoll()).toBe(-1);
   });

   it ('verifyPoll: if (q1) but two options, one is null, do nothing', () => {
      testSideNav.question = 'A';
      testSideNav.tempArray[0] = null;
      testSideNav.tempArray[1] = 'b';
      expect(testSideNav.verifyPoll()).toBe(-1);
   });

   it ('verifyPoll: if (q1) but two options, one is undefined, do nothing', () => {
      testSideNav.question = 'A';
      testSideNav.tempArray[0] = undefined;
      testSideNav.tempArray[1] = 'b';
      expect(testSideNav.verifyPoll()).toBe(-1);
   });

   // NEED INTEGRATION TESTS: /////////////////////////////////
   // - If the question has at least one character(q1) and there are two options with at least one character each, a poll is created
   // - if (q1) and 3 options but one is null, a poll is created w 2 results
   // - if (q1) and 3 options but one is undefined, a poll is created w 2 results

   it ("addOption: adds a blank option to the end of both internal arrays", () => {
      // fills whatever elements are in the array with [at least] one character for identification

      let fillAmtOptions:number;
      if (testSideNav.options === null)
         testSideNav.options = new Array<string>();
      fillAmtOptions = testSideNav.options.length;

      let fillAmtTempArray = testSideNav.tempArray.length;

      for (let i = 0; i < fillAmtOptions; i++)
         testSideNav.options[i] = 'a';
      for (let i = 0; i < fillAmtTempArray; i++)
         testSideNav.tempArray[i] = 'b';

      testSideNav.addOption();

      expect(testSideNav.options.length).toBe(fillAmtOptions + 1);
      expect(testSideNav.tempArray.length).toBe(fillAmtTempArray + 1);
      expect(testSideNav.options[fillAmtOptions]).toBe("");
      expect(testSideNav.tempArray[fillAmtTempArray]).toBe("");
   });

   it ("addOptionValue: doesn't change option val when the supplied option is null", () => {
      testSideNav.tempArray[0] = "";

      expect(testSideNav.addOptionValue(null, 0)).toBe("Error: Option either null or undefined");
   });

   it ("addOptionValue: doesn't change option val when the supplied option is undefined", () => {
      testSideNav.tempArray[0] = "";

      expect(testSideNav.addOptionValue(undefined, 0)).toBe("Error: Option either null or undefined");
   });

   it ("addOptionValue: doesn't change option val when the index is larger than the array size", () => {
      testSideNav.tempArray[0] = "";

      expect(testSideNav.addOptionValue('a', testSideNav.tempArray.length)).toBe("Error: index out of array bounds");
   });

   it ("addOptionValue: doesn't change option val when the index is less than 0", () => {
      testSideNav.tempArray[0] = "";

      expect(testSideNav.addOptionValue('a', -1)).toBe("Error: index out of array bounds");
   });

   it ("addOptionValue: change value when passed a valid index", () => {
      let testIndex:number = 0;
      testSideNav.tempArray[testIndex] = "X";

      expect(testSideNav.addOptionValue('X', testIndex)).toBe("Success");
      expect(testSideNav.tempArray[testIndex]).toBe("X");
   });

   it ("initOptions: creates a new options array, with 1 blank item", () => {
      testSideNav.options = ["zero", "one", "two"]; // will be overwritten

      testSideNav.initOptions();

      expect(testSideNav.options[0]).toBe("");
   });

})
