// @flow
let player;

function addPlayer(videoId: string): void {
  // $FlowFixMe
  player = new YT.Player('player', {
    playerVars: {
      iv_load_policy: 3,
      origin: 'file://',
      rel: 0,
      showinfo: 0
    },
    events: {
      onReady: () => {
        loadVideo(videoId);
      }
    }
  });
}

export function loadVideo(videoId: string): void {
  if (!player) {
    addPlayer(videoId);
  } else {
    player.loadVideoById(videoId);
  }
}
