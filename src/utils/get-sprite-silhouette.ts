let random: number[] = [];

function resetRandom() {
  random = Array(28)
    .fill(1)
    .map((e: number, i) => e + i);
}

export default function getSpriteSilhouette(): number {
  if (random.length <= 0) {
    resetRandom();
  }

  // Get random index and remove it from the array
  const index = Math.floor(Math.random() * (random.length - 1));
  const removed = random.splice(index, 1)[0];

  switch (removed) {
    case 1:
      return require('!/assets/silhouette/unown-b.png');
    case 2:
      return require('!/assets/silhouette/unown-c.png');
    case 3:
      return require('!/assets/silhouette/unown-d.png');
    case 4:
      return require('!/assets/silhouette/unown-e.png');
    case 5:
      return require('!/assets/silhouette/unown-em.png');
    case 6:
      return require('!/assets/silhouette/unown-f.png');
    case 7:
      return require('!/assets/silhouette/unown-g.png');
    case 8:
      return require('!/assets/silhouette/unown-h.png');
    case 9:
      return require('!/assets/silhouette/unown-i.png');
    case 10:
      return require('!/assets/silhouette/unown-j.png');
    case 11:
      return require('!/assets/silhouette/unown-k.png');
    case 12:
      return require('!/assets/silhouette/unown-l.png');
    case 13:
      return require('!/assets/silhouette/unown-m.png');
    case 14:
      return require('!/assets/silhouette/unown-n.png');
    case 15:
      return require('!/assets/silhouette/unown-o.png');
    case 16:
      return require('!/assets/silhouette/unown-p.png');
    case 17:
      return require('!/assets/silhouette/unown-q.png');
    case 18:
      return require('!/assets/silhouette/unown-qm.png');
    case 19:
      return require('!/assets/silhouette/unown-r.png');
    case 20:
      return require('!/assets/silhouette/unown-s.png');
    case 21:
      return require('!/assets/silhouette/unown-t.png');
    case 22:
      return require('!/assets/silhouette/unown-u.png');
    case 23:
      return require('!/assets/silhouette/unown-v.png');
    case 24:
      return require('!/assets/silhouette/unown-w.png');
    case 25:
      return require('!/assets/silhouette/unown-x.png');
    case 26:
      return require('!/assets/silhouette/unown-y.png');
    case 27:
      return require('!/assets/silhouette/unown-z.png');
    default:
      return require('!/assets/silhouette/unown-a.png');
  }
}
