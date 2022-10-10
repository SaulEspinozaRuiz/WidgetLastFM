LASTFM_API_URL = '';
Invalid =
	'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
let back;

function GetRecentTracks(current) {
	fetch(LASTFM_API_URL)
		.then((response) => response.json())
		.then((data) => {
			if (!data.recenttracks.track[1]) return;
			// console.log(data);
			const track = {
				name: data.recenttracks.track[0].name,
				album: data.recenttracks.track[0].album['#text'],
				artist: data.recenttracks.track[0].artist['#text'],
			};
			image = data.recenttracks.track[0].image[3]['#text'];
			if (image === Invalid) {
				image = './ICON.gif';
			}
			if (
				!!current &&
				current.title == track.title &&
				current.album == track.album
			) {
				return;
			} else {
				Update();
			}

			function Update() {
				if (track.name.length >= 18) {
					document.getElementById(
						'root',
					).innerHTML = `<div class="TrackImage"><img id="img" src="${image}"></div><div id="TrackInfo"><div class="name"><marquee><b>${track.name}</b></marquee></div><div class="album">${track.album}</div><div class="artist">${track.artist}</div><div><img src="${image}" class="background"></div></div>`;
				} else {
					document.getElementById(
						'root',
					).innerHTML = `<div class="TrackImage"><img id="img" src="${image}"></div><div id="TrackInfo"><div class="name"><b>${track.name}</b></div><div class="album">${track.album}</div><div class="artist">${track.artist}</div><div><img src="${image}" class="background"></div></div>`;
				}
			}
			return (back = track);
		});
}

setInterval(() => {
	GetRecentTracks(back);
}, 2500);
