// Plugin for executing JavaScript; must be Unsandboxed.

(function (Scratch) {
  class JS {
    getInfo() {
      return {
        id: "js",
        name: "JavaScript",
        blocks: [
          {
            opcode: "run1",
            blockType: Scratch.BlockType.REPORTER,
            text: "run js and output value: [omg]",
            arguments: {
              omg: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "run2",
            blockType: Scratch.BlockType.COMMAND,
            text: "run js: [omg]",
            arguments: {
              omg: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }
    run1(args) {
      return eval(args.omg);
    }
    run2(args) {
      eval(args.omg);
    }
  }
  Scratch.extensions.register(new JS());
})(Scratch);
