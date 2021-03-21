import { EventEmitter } from "./EventEmitter";

describe("EventEmitter", () => {
  describe("formal public interface", () => {
    it("is a constructor", () => {
      expect(typeof EventEmitter).toBe("function");
      expect(new EventEmitter() instanceof EventEmitter).toBe(true);
    });

    it("has public methods", () => {
      const eventEmitter = new EventEmitter();

      expect(typeof eventEmitter.on).toBe("function");
      expect(typeof eventEmitter.off).toBe("function");
      expect(typeof eventEmitter.trigger).toBe("function");
    });
  });

  describe("runtime logic", () => {
    let eventEmitter: EventEmitter;
    const eventName = "eventName";
    const eventPayload = { name: "Bob" };

    beforeEach(() => {
      eventEmitter = new EventEmitter();
    });
    it("allows to listen to the events", () => {
      const spy = jest.fn();
      eventEmitter.on(eventName, spy);
      expect(spy).not.toHaveBeenCalled();
      eventEmitter.trigger(eventName, eventPayload);
      expect(spy).toHaveBeenCalledWith(eventPayload);
    });

    it("supports multiple listeners for the event", () => {
      const spy1 = jest.fn();
      const spy2 = jest.fn();
      eventEmitter.on(eventName, spy1);
      eventEmitter.on(eventName, spy2);
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
      eventEmitter.trigger(eventName, eventPayload);
      expect(spy1).toHaveBeenCalledWith(eventPayload);
      expect(spy2).toHaveBeenCalledWith(eventPayload);
    });

    it("allows to unsubscribe from the events", () => {
      const spy1 = jest.fn();
      const spy2 = jest.fn();
      eventEmitter.on(eventName, spy1);
      eventEmitter.on(eventName, spy2);
      eventEmitter.off(eventName, spy1);
      eventEmitter.trigger(eventName, eventPayload);
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledWith(eventPayload);
    });

    describe("edge cases", () => {
      it("handles events with no listeners", () => {
        expect(() => {
          eventEmitter.trigger(eventName, eventPayload);
        }).not.toThrowError();
      });

      it("handles invalid unsubscriptions", () => {
        eventEmitter.on("x", jest.fn());
        expect(() => {
          eventEmitter.off("x", () => {});
          eventEmitter.off(eventName, () => {});
        }).not.toThrowError();
      });

      it("handles triggers with no subscriptions", () => {
        expect(() => {
          eventEmitter.trigger(eventName, eventPayload);
        }).not.toThrowError();
      });
    });
  });
});
