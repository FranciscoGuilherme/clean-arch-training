import Address from "./address";

describe("Address unit tests", () => {
  it("should throw Error when street is empty", () => {
    const arrange = [
      {
        address: ["", 123, "13330-250", "São Paulo"],
        expect: "Street is required",
      },
      {
        address: ["Street 1", 0, "13330-250", "São Paulo"],
        expect: "Number is required",
      },
      {
        address: ["Street 1", 123, "", "São Paulo"],
        expect: "Zip is required",
      },
      {
        address: ["Street 1", 123, "13330-250", ""],
        expect: "City is required",
      },
    ];

    arrange.forEach((element) => {
      expect(() => {
        const address = element.address;
        new Address(
          address[0] as any,
          address[1] as any,
          address[2] as any,
          address[3] as any
        );
      }).toThrowError(element.expect);
    });
  });

  test("result to string", () => {
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    expect(address.toString()).toBe("Street 1, 123, 13330-250 São Paulo");
  });
});
