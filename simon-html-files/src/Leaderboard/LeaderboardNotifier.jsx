

const LeaderboardChanger = {
    System: 'System',
    ScoreUpdate: 'ScoreUpdate',
  };
class EventMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  
  class LeaderBoardChangeNotifier {
    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value)
      this.handlers.forEach((handler) => handler(event))
    }
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler)
    }
    addHandler(handler) {
      if (!this.handlers.includes(handler)) {
        this.handlers.push(handler)
      }
    }
  
    receiveEvent(event) {
      this.events.push(event);
      this.handlers.forEach((handler) => {handler(event);});
    }
    handlers = []
    constructor() {
      this.events = [];
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket('ws://localhost:4000/ws');
      this.socket.onopen = (event) => {
        this.receiveEvent(new EventMessage('To-do', LeaderboardChanger.System, { msg: 'connected' }));
      };
      this.socket.onclose = (event) => {
        this.receiveEvent(new EventMessage('To-do', LeaderboardChanger.System, { msg: 'disconnected' }));
      };
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {}
      };
    
  
    
  
    
  }
  
  
  } 

export const LeaderboardNotifier = new LeaderBoardChangeNotifier()
