(function(Scratch) {
  let _ws;
  let _wsMessage;

  class SetSocket {
    getInfo() {
      return {
        id: 'setsocket',
        name: 'SetSocket',
        blocks: [{
            opcode: 'ws_connect',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Connect to WebSocket server: [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "wss://ws.postman-echo.com/raw"
              }
            }
          },
          {
            opcode: 'send',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Send [DATA] to WebSocket',
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, WebSockets!"
              }
            }
          },
          {
            opcode: 'whenConnectedToWebSocket',
            blockType: Scratch.BlockType.EVENT,
            text: 'When WebSocket connected',
            isEdgeActivated: false
          },
          {
            opcode: 'whenMessageRecieved',
            blockType: Scratch.BlockType.EVENT,
            text: 'When WebSocket Message Recieved',
            isEdgeActivated: false
          },
          {
            opcode: 'getMessage',
            blockType: Scratch.BlockType.REPORTER,
            text: 'message text'
          }
        ]
      }
    }

    ws_connect(args) {
      _ws = new WebSocket(args.URL);

      _ws.onopen = () => {
        Scratch.vm.runtime.startHats("setsocket_whenConnectedToWebSocket");
      };

      _ws.onmessage = (e) => {
        const data = e.data;

        _wsMessage = data;
        Scratch.vm.runtime.startHats("setsocket_whenMessageRecieved");
      };
    }

    send(args) {
      _ws.send(args.DATA.toString());
    }

    getMessage() {
      return _wsMessage;
    }
  }

  Scratch.extensions.register(new SetSocket());
})(Scratch);
