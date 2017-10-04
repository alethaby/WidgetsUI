
var IDLE = {
  id: 0,
  master: {
    values: {
      
    },
    events: {
      
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      
    }
  }
};
var STATE_IDLE = 0;
var OFF = {
  id: 1,
  master: {
    values: {
      
    },
    events: {
      
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      
    }
  }
};
var STATE_OFF = 1;
var MOTIONMACHINE = {
  id: 2,
  master: {
    values: {
      position: new HardwareValue(2, 0, Manager.TYPE_UINT32)
    },
    events: {
      demo: function demo() { manager.sendEvent(0, 2); },
      goHome: function goHome() { manager.sendEvent(1, 2); },
      goUp: function goUp() { manager.sendEvent(2, 2); },
      stairsOn: function stairsOn() { manager.sendEvent(3, 2); },
      stairsOff: function stairsOff() { manager.sendEvent(4, 2); },
      openServo: function openServo() { manager.sendEvent(5, 2); },
      closeServo: function closeServo() { manager.sendEvent(6, 2); }
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      demoComplete: new LocalEvent(2, 0)
    }
  }
};
var STATE_MOTIONMACHINE = 2;
var ROBOTICARM = {
  id: 3,
  master: {
    values: {
      position: new HardwareValue(3, 0, Manager.TYPE_UINT32)
    },
    events: {
      demo: function demo() { manager.sendEvent(0, 3); },
      goHome: function goHome() { manager.sendEvent(1, 3); },
      goToHigh: function goToHigh() { manager.sendEvent(2, 3); },
      goToLow: function goToLow() { manager.sendEvent(3, 3); },
      eMagnetOn: function eMagnetOn() { manager.sendEvent(4, 3); },
      eMagnetOff: function eMagnetOff() { manager.sendEvent(5, 3); },
      pistonOn: function pistonOn() { manager.sendEvent(6, 3); },
      pistonOff: function pistonOff() { manager.sendEvent(7, 3); }
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      demoComplete: new LocalEvent(3, 0)
    }
  }
};
var STATE_ROBOTICARM = 3;
var RAMPDUEL = {
  id: 4,
  master: {
    values: {
      
    },
    events: {
      resetScore: function resetScore() { manager.sendEvent(0, 4); },
      fireLeftPiston: function fireLeftPiston() { manager.sendEvent(1, 4); },
      fireRightPiston: function fireRightPiston() { manager.sendEvent(2, 4); }
    }
  },
  tablet: {
    values: {
      score: new LocalValue(0, Manager.TYPE_UINT32)
    },
    events: {
      
    }
  }
};
var STATE_RAMPDUEL = 4;

var STATES = {
  IDLE: IDLE,
  OFF: OFF,
  MOTIONMACHINE: MOTIONMACHINE,
  ROBOTICARM: ROBOTICARM,
  RAMPDUEL: RAMPDUEL
};
var manager = new Manager([IDLE, OFF, MOTIONMACHINE, ROBOTICARM, RAMPDUEL]);
