import { checkValidUrl } from '../src/client/js/urlChecker'
  
describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test("Testing the checkValidUrl() function", () => {
    expect(checkValidUrl).toBeDefined();
  })
});

