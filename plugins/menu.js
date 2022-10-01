import { promises, readFileSync } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
const { makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default
let emot = `${pickRandom(['⎔', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '▢', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`
	
const defaultMenu = {
  before: `
╭─────═[ INFO USER ]═─────⋆
│╭───────────────···
┴│☂︎ *Name:* %name
${emot}│☂︎ *Tag:* %tag
${emot}│☂︎ *Premium:* %prems
${emot}│☂︎ *Limit:* %limit
${emot}│☂︎ *Money:* %money
${emot}│☂︎ *Role:* %role
${emot}│☂︎ *Level:* %level [ %xp4levelup Xp For Levelup]
${emot}│☂︎ *Xp:* %exp / %maxexp
┬│☂︎ *Total Xp:* %totalexp
│╰────────────────···
┠─────═[ TODAY ]═─────⋆
│╭────────────────···
┴│    *${ucapan()} %name!*
${emot}│☂︎ *Tanggal:* %week %weton
${emot}│☂︎ *Date:* %date
${emot}│☂︎ *Tanggal Islam:* %dateIslamic
┬│☂︎ *Waktu:* %time
│╰────────────────···
┠─────═[ INFO BOT ]═─────⋆
│╭────────────────···
┴│☂︎ *Nama Bot:* %me
${emot}│☂︎ *Mode:* %mode
${emot}│☂︎ *Prefix:* [ *%_p* ]
${emot}│☂︎ *Baileys:* Multi Device
${emot}│☂︎ *Battery:* ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
${emot}│☂︎ *Platform:* %platform
${emot}│☂︎ *Type:* Node.Js
${emot}│☂︎ *Uptime:* %muptime
┬│☂︎ *Database:* %rtotalreg dari %totalreg
│╰────────────────···
╰──────────═┅═──────────

⃝▣──「 *INFO CMD* 」───⬣
│ *Ⓟ* = Premium
│ *Ⓛ* = Limit
▣────────────⬣
%readmore
`.trimStart(),
  header: '⃝▣──「 %category 」───⬣',
  body: `${emot} %cmd %isPremium %islimit`,
  footer: '▣───────────⬣\n',
  after: `%c4 %me`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command}) => {
  let res = JSON.parse(readFileSync('./json/emoji.json'))
     let em = res.emoji
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let whmods = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
	let tags
	let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'maker', 'berita', 'edukasi', 'news', 'random', 'logo', 'menbalas', 'game', 'xp', 'islamic', 'stiker', 'rpg', 'kerangajaib', 'quotes', 'admin', 'group', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database','quran', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner', 'nocategory']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'Main',
  'game': 'Game',
  'rpg': 'RPG Games',
  'xp': 'Exp & Limit',
  'sticker': 'Sticker',
  'kerang': 'Kerang Ajaib',
  'quotes': 'Quotes',
  'fun': 'Fun',
  'anime': 'Anime',
  'admin': 'Admin',
  'group': 'Group',
  'vote': 'Voting',
  'absen': 'Absen',
  'premium': 'Premium',
  'anonymous': 'Anonymous Chat',
  'internet': 'Internet',
  'downloader': 'Downloader',
  'tools': 'Tools',
  'nulis': 'MagerNulis & Logo',
  'audio': 'Audio',
  'logo': 'Logo Menu',
  'maker': 'Maker',
  'berita': 'Berita',
  'database': 'Database',
  'quran': 'Al Qur\'an',
  'owner': 'Owner',
  'host': 'Host',
  'advanced': 'Advanced',
  'info': 'Info',
  '': 'No Category',
}
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'berita') tags = {
    'berita': 'Berita'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'Nulis',
    'maker': 'Maker'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
if (teks == 'menbalas') tags = {
    'menbalas': 'Menfess'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
  }
  if (teks == 'logo') tags = {
    'logo': 'Logo Menu',
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al-Qur\'an',
    'islamic': 'Islamic'
  }
  if (teks == 'audio') tags = {
    'audio': 'Audio'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'nocategory') tags = {
    '': 'No Category'
  }
  try {
  	// DEFAULT MENU
      let dash = global.dashmenu
  	let m1 = global.dmenut
      let m2 = global.dmenub
      let m3 = global.dmenuf
      let m4 = global.dmenub2
      
      // COMMAND MENU
      let cc = global.cmenut
      let c1 = global.cmenuh
      let c2 = global.cmenub
      let c3 = global.cmenuf
      let c4 = global.cmenua
      
      // LOGO L P
      let lprem = global.lopr
      let llim = global.lolm
      let tag = `@${m.sender.split('@')[0]}`
    
    //-----------TIME---------
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)

let usrs = db.data.users[m.sender]

const sections = [
   {
    title: `${htki} MAIN ${htka}`,
    rows: [
        {title: `⚡ ${pmenus} SPEED BOT`, rowId: ".speed", description: "Menampilkan kecepatan respon BOT"},
        {title: `💌 ${pmenus} OWNER BOT`, rowId: ".owner", description: "Menampilkan List owner BOT"},
        {title: `⏰ ${pmenus} RUNTIME BOT`, rowId: ".runtime", description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 Waktu Bot Berjalan"}, 
        {title: `📔 ${pmenus} SCRIPT BOT`, rowId: ".sc", description: `Source Code ${namebot}`},
    ]
      },{
        title: `${htki} SUPPORT ${htka}`,
        rows: [
            {title: `🔖 ${pmenus} SEWA`, rowId: ".sewa", description: "Menampilkan list harga sewa BOT"},
            {title: `🌟 ${pmenus} BUY PREMIUM`, rowId: ".premium", description: "Menampilkan list harga premium"},
            {title: `💹 ${pmenus} DONASI`, rowId: ".donasi", description: 'Support BOT agar lebih fast respon'},
        ]
        },{
          title: `${htki} MENU MENFESS ${htka}`,
          rows: [
            {title: `💬 ${pmenus} Menfess Balas`, rowId: ".? menbalas", description: "Menampilkan Semua command BOT"},
          ]},{
        title: `${htki} MENU ${htka}`,
        rows: [
            {title: `💬 ${pmenus} All`, rowId: ".? all", description: "Menampilkan Semua command BOT"},
            {title: `🌱 ${pmenus} Rpg`, rowId: ".? rpg", description: "Game Epic Rpg!"},
        {title: `✨ ${pmenus} Exp`, rowId: ".? xp", description: "Ayo tingkatkan pangkat mu!"},
        {title: `🎮 ${pmenus} Game`, rowId: ".? game", description: "Gamenya seru seru lho >-<"},
        {title: `🧩 ${pmenus} Fun`, rowId: ".? fun", description: "Fitur yang aman untuk keluarga"},
        {title: `🐚 ${pmenus} Kerang`, rowId: ".? kerangajaib", description: "Tanyakan pada ketua club"},
        {title: `📑 ${pmenus} Quotes`, rowId: ".? quotes", description: "Random Inspirasi"},
        {title: `⛩️ ${pmenus} Anime`, rowId: ".? anime", description: "Kamu wibu ya bang?"},
        {title: `🔞 ${pmenus} Nsfw`, rowId: ".? nsfw", description: "Tch, dasar sagne"},
        {title: `🌟 ${pmenus} Premium`, rowId: ".? premium", description: "Only premium Users"},
        {title: `🎭 ${pmenus} Anonymous Chats`, rowId: ".? anonymous", description: "Bicara dengan orang tidak dikenal"},
        {title: `📖 ${pmenus} Al-Quran`, rowId: ".? quran", description: "Tobat yuk kak"},
        {title: `🌎 ${pmenus} Internet`, rowId: ".? internet", description: "Cari sesuatu diBOT"},
        {title: `🌎 ${pmenus} Berita`, rowId: ".? berita", description: "Cari berita terupdate"},
        {title: `📩 ${pmenus} Downloaders`, rowId: ".? downloader", description: "Download sesuatu diBOT"},
        {title: `🎨 ${pmenus} Stikers`, rowId: ".? stiker", description: "Buat Sticker diBOT"},
        {title: `🎨 ${pmenus} Logo`, rowId: ".? logo", description: "Buat Logo Kamu diBOT"},
        {title: `✏️ ${pmenus} Nulis`, rowId: ".? nulis", description: "Nulis kok males kak?"},
        {title: `🎧 ${pmenus} Audio`, rowId: ".? audio", description: "Ubah Audio dengan Filter"},
        {title: `🎧 ${pmenus} Sound Menu`, rowId: ".soundmenu", description: "Kumpulan 120 Sound"},
        {title: `🎧 ${pmenus} Sound Kane Menu`, rowId: ".soundkanemenu", description: "Kumpulan 24 Sound"},
        {title: `🏢 ${pmenus} Group`, rowId: ".? group", description: "Only Groups"},
        {title: `👑 ${pmenus} Admin`, rowId: ".? admin", description: "Only Admin Group"},
        {title: `🗂️ ${pmenus} Database`, rowId: ".? database", description: "Simpan sesuatu diBOT"},
        {title: `🛠️ ${pmenus} Tools`, rowId: ".? tools", description: "Mungkin tools ini bisa membantu?"},
        {title: `ℹ️ ${pmenus} Info`, rowId: ".? info", description: "Info info BOT"},
        {title: `👩‍💻 ${pmenus} Owner`, rowId: ".? owner", description: "Owner Only!"},
        {title: `❓ ${pmenus} No Category`, rowId: ".? nocategory", description: "Fitur tanpa kategory!"},
        ]
        },
]

function M(W,v){return U(v-0x1da,W);}function U(W,v){const z=Q();return U=function(Z,V){Z=Z-0xba;let g=z[Z];if(U['\x4f\x4d\x6c\x62\x41\x54']===undefined){var M=function(y){const A='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';let x='',b='';for(let F=0x0,p,n,E=0x0;n=y['\x63\x68\x61\x72\x41\x74'](E++);~n&&(p=F%0x4?p*0x40+n:n,F++%0x4)?x+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](0xff&p>>(-0x2*F&0x6)):0x0){n=A['\x69\x6e\x64\x65\x78\x4f\x66'](n);}for(let H=0x0,S=x['\x6c\x65\x6e\x67\x74\x68'];H<S;H++){b+='\x25'+('\x30\x30'+x['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](H)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x10))['\x73\x6c\x69\x63\x65'](-0x2);}return decodeURIComponent(b);};const J=function(A,b){let F=[],p=0x0,n,E='';A=M(A);let H;for(H=0x0;H<0x100;H++){F[H]=H;}for(H=0x0;H<0x100;H++){p=(p+F[H]+b['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](H%b['\x6c\x65\x6e\x67\x74\x68']))%0x100,n=F[H],F[H]=F[p],F[p]=n;}H=0x0,p=0x0;for(let S=0x0;S<A['\x6c\x65\x6e\x67\x74\x68'];S++){H=(H+0x1)%0x100,p=(p+F[H])%0x100,n=F[H],F[H]=F[p],F[p]=n,E+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](A['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](S)^F[(F[H]+F[p])%0x100]);}return E;};U['\x63\x4d\x42\x71\x6c\x4a']=J,W=arguments,U['\x4f\x4d\x6c\x62\x41\x54']=!![];}const K=z[0x0],Y=Z+K,r=W[Y];return!r?(U['\x68\x5a\x7a\x46\x4c\x72']===undefined&&(U['\x68\x5a\x7a\x46\x4c\x72']=!![]),g=U['\x63\x4d\x42\x71\x6c\x4a'](g,V),W[Y]=g):g=r,g;},U(W,v);}function Q(){const K=['\x76\x45\x6f\x63\x4e\x57\x46\x49\x4c\x35\x37\x49\x4e\x35\x69\x48\x70\x4d\x6e\x45\x45\x73\x31\x47\x57\x35\x33\x63\x52\x53\x6f\x78\x77\x43\x6b\x49\x42\x57\x74\x63\x48\x53\x6f\x6b\x66\x53\x6f\x62\x57\x34\x70\x63\x56\x2f\x63\x51\x49\x37\x54\x59\x34\x50\x77\x6f\x34\x50\x32\x61\x72\x58\x72\x70\x66\x38\x6b\x53\x44\x6d\x6f\x31\x61\x38\x6f\x74\x61\x43\x6f\x66\x71\x38\x6b\x33\x57\x51\x71\x44\x61\x62\x4e\x64\x52\x6d\x6b\x71\x57\x4f\x38\x61\x6c\x33\x70\x63\x53\x43\x6f\x4a\x57\x51\x64\x63\x4e\x57\x47\x38\x57\x36\x58\x2b\x69\x43\x6b\x4d\x69\x4c\x33\x64\x49\x66\x74\x63\x4c\x32\x4f\x47\x72\x43\x6f\x57\x34\x50\x77\x70\x57\x51\x78\x49\x4c\x4f\x76\x7a\x34\x50\x77\x32\x34\x50\x41\x48\x34\x50\x73\x6a\x34\x50\x77\x77\x34\x50\x45\x4b\x34\x50\x73\x62\x34\x50\x77\x49\x34\x50\x41\x47\x34\x50\x41\x75\x34\x50\x45\x74\x34\x50\x73\x43\x34\x50\x77\x37\x34\x50\x73\x76\x34\x50\x41\x46\x34\x50\x41\x68\x34\x50\x41\x7a\x34\x50\x77\x74\x34\x50\x41\x36\x34\x50\x77\x6b\x34\x4f\x55\x2b\x45\x6f\x6b\x77\x4d\x6d\x6f\x53\x78\x6f\x6f\x61\x52\x64\x46\x63\x55\x4e\x78\x64\x53\x43\x6b\x2b\x74\x68\x46\x64\x4e\x61\x52\x64\x56\x61\x34\x54\x64\x63\x58\x72\x57\x36\x31\x62\x57\x52\x70\x63\x54\x45\x77\x65\x4e\x53\x6f\x62\x65\x55\x6f\x63\x49\x53\x6f\x66\x34\x50\x41\x49','\x57\x37\x66\x4c\x57\x34\x5a\x63\x52\x6d\x6f\x67\x57\x50\x54\x48\x6d\x38\x6b\x68\x57\x35\x56\x63\x4a\x66\x33\x64\x55\x38\x6b\x44','\x41\x6d\x6b\x54\x57\x4f\x65\x53\x57\x52\x6c\x63\x4b\x47','\x57\x4f\x74\x63\x50\x74\x34','\x57\x52\x4a\x64\x48\x5a\x57\x58\x69\x61','\x74\x58\x4f\x2f\x57\x34\x4a\x64\x4f\x38\x6f\x79','\x6d\x4d\x6c\x63\x53\x43\x6b\x72\x57\x35\x37\x63\x4b\x57\x70\x63\x52\x59\x46\x64\x51\x4c\x39\x66\x57\x34\x79','\x57\x36\x74\x64\x4a\x77\x34\x4f\x57\x50\x42\x64\x55\x38\x6f\x67\x57\x35\x64\x63\x4b\x38\x6f\x46\x46\x43\x6f\x4a','\x6e\x4e\x46\x63\x52\x66\x78\x63\x48\x68\x5a\x64\x55\x76\x52\x63\x4f\x43\x6b\x43\x57\x34\x56\x64\x48\x66\x6d','\x34\x50\x2b\x6e\x34\x50\x77\x55\x34\x50\x77\x6d\x34\x50\x73\x4f\x34\x50\x77\x69\x57\x37\x42\x63\x4c\x74\x78\x63\x50\x4a\x6a\x47\x6d\x6d\x6f\x59\x57\x35\x2f\x63\x47\x43\x6b\x78\x6b\x67\x6c\x64\x4c\x43\x6f\x59\x77\x38\x6f\x6e\x63\x72\x68\x49\x4c\x79\x37\x49\x4c\x41\x68\x49\x4c\x4f\x52\x49\x4c\x50\x70\x49\x4e\x6a\x4e\x63\x52\x71\x61','\x57\x36\x5a\x63\x4e\x43\x6f\x5a\x57\x51\x54\x32\x62\x47\x47\x43\x57\x36\x31\x4b\x41\x53\x6f\x6a','\x78\x53\x6f\x52\x57\x51\x72\x55\x6a\x59\x64\x63\x51\x30\x42\x63\x54\x58\x56\x64\x51\x38\x6f\x34\x57\x36\x4f','\x46\x2b\x6b\x77\x50\x47\x46\x49\x4c\x36\x37\x63\x4a\x55\x6b\x75\x4e\x45\x6b\x75\x4e\x2b\x6b\x75\x4f\x6f\x6b\x75\x56\x55\x6b\x75\x4e\x2b\x6b\x76\x4a\x45\x6b\x75\x49\x6f\x6b\x77\x53\x45\x6b\x78\x4a\x55\x6b\x77\x55\x6f\x6b\x75\x55\x45\x6b\x77\x47\x2b\x6b\x75\x50\x55\x6b\x76\x50\x6f\x6b\x78\x54\x45\x6b\x77\x4f\x55\x6b\x76\x55\x55\x6b\x77\x56\x6f\x6b\x78\x56\x6f\x6b\x6a\x4d\x76\x2f\x49\x4c\x37\x30','\x64\x76\x58\x50\x57\x4f\x78\x64\x47\x43\x6f\x6d','\x57\x4f\x47\x70\x69\x4b\x79\x54\x6a\x71','\x57\x50\x56\x64\x48\x59\x46\x64\x4c\x4a\x5a\x64\x53\x38\x6b\x56\x57\x37\x39\x5a\x74\x43\x6b\x63\x42\x61','\x57\x34\x65\x4d\x57\x51\x56\x64\x4a\x61','\x57\x36\x4a\x64\x48\x33\x46\x64\x53\x65\x57','\x57\x50\x46\x49\x4c\x34\x74\x49\x4c\x6a\x70\x49\x4c\x4f\x70\x49\x4c\x6c\x37\x49\x4c\x6b\x74\x49\x4c\x42\x42\x49\x4c\x6b\x56\x49\x4c\x36\x42\x49\x4c\x7a\x64\x49\x4c\x41\x56\x49\x4c\x41\x5a\x49\x4c\x36\x78\x49\x4c\x6a\x46\x49\x4c\x50\x6c\x49\x4c\x79\x68\x49\x4c\x42\x6c\x49\x4c\x6c\x4e\x49\x4c\x7a\x42\x49\x4c\x37\x68\x49\x4c\x6a\x53','\x42\x64\x37\x6c\x49\x55\x67\x31\x47\x55\x67\x30\x53\x55\x67\x33\x4d\x6d\x51\x6c\x41\x53\x6f\x63\x57\x37\x79','\x42\x5a\x37\x64\x53\x43\x6f\x67','\x57\x4f\x6a\x35\x57\x52\x68\x64\x52\x4d\x4a\x63\x49\x74\x4f\x4f','\x57\x52\x4e\x63\x4e\x72\x44\x50\x57\x35\x4f\x76\x78\x38\x6f\x6a\x41\x53\x6f\x32\x45\x4c\x70\x64\x48\x71','\x42\x64\x37\x6c\x49\x53\x49\x56\x34\x42\x73\x46\x59\x52\x78\x48\x54\x69\x39\x51\x57\x34\x6c\x64\x54\x47','\x64\x6d\x6f\x33\x34\x50\x77\x75\x34\x50\x77\x74\x34\x50\x73\x41\x34\x50\x41\x57\x34\x50\x45\x4d\x34\x50\x77\x67\x34\x50\x41\x73\x34\x50\x77\x6a\x34\x50\x45\x6f\x34\x50\x77\x78\x34\x50\x77\x2b\x34\x50\x77\x62\x34\x50\x45\x54\x34\x50\x41\x78\x34\x50\x77\x6c\x34\x50\x41\x68\x34\x50\x41\x6b\x34\x50\x45\x70\x34\x50\x41\x74\x34\x50\x36\x54\x63\x45\x6b\x78\x55\x57\x52\x49\x4c\x6c\x42\x64\x55\x55\x6b\x78\x47\x57','\x57\x36\x57\x72\x57\x34\x6c\x63\x55\x76\x37\x64\x53\x6d\x6b\x65','\x6c\x58\x6c\x63\x4c\x38\x6f\x62\x7a\x57\x4b','\x65\x43\x6f\x50\x57\x50\x52\x64\x50\x5a\x48\x47\x57\x50\x68\x63\x48\x6d\x6f\x4d\x57\x34\x6d\x59\x62\x61','\x42\x5a\x6c\x64\x53\x43\x6f\x67\x57\x4f\x43','\x57\x52\x46\x63\x4c\x65\x6c\x64\x50\x31\x66\x63\x65\x66\x2f\x63\x49\x74\x62\x47\x34\x50\x77\x56','\x57\x36\x30\x32\x43\x38\x6b\x57\x57\x50\x68\x64\x52\x6d\x6b\x64\x57\x35\x78\x63\x50\x77\x56\x63\x56\x71','\x57\x52\x42\x63\x50\x74\x74\x64\x51\x61','\x57\x36\x4e\x63\x47\x4a\x44\x45\x71\x4c\x6e\x75','\x72\x6d\x6b\x52\x6f\x38\x6f\x58\x57\x52\x69\x33\x6c\x4c\x66\x31\x74\x74\x76\x56\x57\x34\x65','\x44\x53\x6b\x56\x59\x50\x5a\x48\x54\x35\x68\x48\x54\x52\x37\x48\x54\x50\x64\x64\x4c\x53\x6b\x6d\x6f\x47','\x69\x68\x30\x34\x6c\x67\x79','\x57\x36\x56\x63\x48\x64\x4a\x64\x53\x66\x5a\x64\x4a\x38\x6b\x75\x57\x34\x61','\x65\x48\x79\x6e\x57\x4f\x31\x51\x57\x37\x56\x63\x51\x53\x6f\x4d\x57\x52\x37\x63\x4e\x38\x6b\x57\x67\x43\x6f\x39','\x44\x53\x6b\x70\x78\x64\x39\x59\x57\x34\x74\x63\x49\x4d\x46\x64\x48\x4a\x56\x63\x51\x49\x71','\x75\x33\x64\x64\x52\x43\x6b\x4c\x68\x38\x6b\x6a\x57\x50\x38\x4e\x57\x37\x46\x64\x54\x57','\x57\x34\x43\x50\x66\x4d\x56\x64\x51\x59\x34','\x6a\x57\x70\x64\x53\x72\x70\x64\x4d\x63\x56\x64\x4f\x65\x74\x63\x49\x43\x6b\x34\x57\x37\x33\x64\x48\x76\x4a\x63\x4a\x71','\x66\x58\x38\x6d\x57\x4f\x35\x51\x57\x37\x37\x63\x51\x38\x6b\x4c\x57\x51\x6c\x63\x50\x43\x6b\x49\x6a\x53\x6f\x6d\x42\x71','\x57\x34\x6d\x37\x57\x51\x6c\x64\x48\x65\x37\x63\x49\x47\x30\x4f\x64\x47\x44\x61','\x57\x36\x4b\x76\x57\x34\x6c\x63\x47\x31\x52\x64\x52\x38\x6b\x79','\x74\x63\x7a\x51\x69\x31\x34\x4a\x57\x34\x33\x63\x50\x6d\x6f\x41\x64\x63\x70\x49\x4a\x52\x75','\x57\x4f\x4f\x56\x57\x50\x35\x35\x57\x50\x37\x64\x4f\x48\x6d','\x73\x53\x6b\x79\x76\x5a\x76\x56\x57\x35\x4b','\x57\x36\x56\x64\x49\x4c\x69\x30\x57\x4f\x39\x71','\x68\x75\x6e\x4e','\x64\x4b\x54\x49\x57\x4f\x5a\x64\x4a\x43\x6f\x6c\x57\x51\x33\x63\x4b\x53\x6b\x59\x57\x37\x43\x59','\x57\x4f\x47\x4b\x57\x50\x35\x66\x57\x50\x42\x64\x51\x47\x75','\x57\x52\x74\x63\x48\x55\x67\x30\x4d\x59\x70\x48\x54\x36\x56\x6c\x4e\x6d\x49\x4a\x34\x42\x41\x35\x34\x42\x45\x49\x57\x50\x42\x48\x54\x69\x52\x69\x4a\x45\x67\x33\x4c\x55\x67\x33\x4d\x38\x4d\x37\x34\x42\x41\x4e\x34\x42\x41\x33\x74\x62\x5a\x64\x4b\x45\x6b\x75\x4f\x71','\x57\x50\x43\x41\x6b\x43\x6b\x4a\x57\x4f\x42\x63\x54\x4d\x54\x55\x6a\x4c\x6e\x43\x57\x50\x34','\x69\x58\x52\x63\x50\x38\x6b\x64','\x57\x37\x4b\x45\x57\x50\x70\x64\x4a\x38\x6b\x35\x57\x34\x75\x58','\x57\x36\x75\x37\x69\x43\x6b\x61\x57\x36\x46\x63\x52\x4e\x61','\x61\x38\x6b\x33\x57\x37\x6d\x57\x41\x33\x61','\x57\x52\x33\x64\x48\x4a\x57\x55\x6f\x53\x6b\x50\x57\x4f\x74\x64\x4b\x43\x6b\x4a\x57\x51\x5a\x64\x54\x57','\x71\x53\x6b\x36\x57\x35\x70\x63\x50\x47','\x78\x48\x70\x48\x54\x6a\x56\x63\x4b\x55\x67\x32\x4f\x38\x49\x2b\x57\x52\x70\x64\x56\x6d\x6f\x58\x57\x52\x4f','\x71\x57\x53\x61\x65\x5a\x34\x4e\x57\x35\x6c\x63\x4e\x65\x4a\x63\x55\x6d\x6b\x45\x57\x50\x57','\x64\x6d\x6b\x36\x57\x37\x57\x4a\x42\x61','\x38\x79\x45\x4c\x47\x47\x48\x77\x57\x34\x2f\x64\x4c\x48\x6c\x63\x47\x72\x43\x32\x57\x35\x6e\x43','\x46\x4e\x4e\x64\x50\x38\x6f\x57\x57\x36\x39\x4b\x41\x47','\x57\x4f\x48\x6f\x70\x6d\x6b\x77\x77\x53\x6f\x51\x71\x57','\x43\x4a\x68\x64\x56\x58\x78\x64\x47\x47','\x57\x51\x75\x6d\x6c\x53\x6b\x4d\x57\x34\x5a\x63\x4a\x47','\x57\x36\x46\x64\x49\x78\x69\x2f\x57\x50\x42\x64\x48\x61','\x57\x35\x64\x64\x49\x77\x4f\x2b\x57\x50\x2f\x64\x4d\x43\x6f\x74\x57\x35\x56\x63\x4c\x71','\x57\x50\x70\x64\x49\x62\x4e\x49\x4c\x6c\x69','\x57\x4f\x43\x56\x78\x65\x43','\x57\x50\x5a\x64\x4c\x38\x6b\x53\x57\x37\x4c\x56\x45\x4c\x4b\x68\x57\x34\x7a\x66\x7a\x38\x6f\x6f\x69\x57','\x6e\x66\x37\x63\x51\x6f\x6b\x77\x47\x47','\x57\x4f\x4b\x67\x6c\x76\x57','\x57\x51\x56\x64\x4e\x74\x75\x33\x6e\x53\x6b\x55','\x6c\x53\x6b\x6b\x57\x35\x6e\x48','\x57\x36\x37\x64\x4b\x78\x5a\x64\x50\x4c\x50\x78','\x57\x52\x4e\x49\x4e\x52\x57\x7a\x34\x50\x73\x43\x6d\x46\x67\x67\x53\x6c\x71\x30\x38\x6b\x4d\x30\x4e\x56\x67\x67\x4c\x6b\x64\x57\x51\x50\x73\x78\x38\x6c\x36\x66\x47\x56\x67\x6e\x54\x36\x37\x57\x4d\x50\x41\x34\x45\x4a\x37\x63\x52\x55\x6b\x76\x55\x4c\x68\x69\x4c\x45\x67\x30\x56\x38\x55\x69\x59\x35\x72\x72\x34\x42\x77\x45\x34\x42\x77\x6e\x34\x42\x41\x57\x34\x42\x77\x69\x57\x37\x42\x6a\x49\x2b\x67\x33\x56\x43\x49\x6b\x57\x50\x70\x48\x54\x37\x68\x48\x54\x41\x5a\x48\x54\x37\x78\x64\x4c\x53\x6f\x6f\x5a\x37\x71\x4a\x57\x50\x6c\x49\x4c\x69\x4a\x64\x50\x45\x6b\x77\x4d\x2b\x6b\x78\x51\x45\x6b\x75\x54\x55\x6b\x78\x4d\x45\x6b\x77\x49\x45\x6b\x75\x50\x6f\x6b\x76\x53\x55\x6b\x78\x53\x6f\x6b\x75\x51\x2b\x6b\x75\x56\x6f\x6b\x75\x47\x2b\x6b\x76\x55\x55\x6b\x75\x48\x6f\x6b\x78\x4d\x55\x6b\x76\x51\x55\x6b\x77\x4b\x2b\x6b\x77\x47\x6f\x6b\x77\x4b\x55\x6b\x77\x49\x45\x6b\x6b\x4b\x33\x70\x49\x4c\x50\x30','\x76\x43\x6b\x34\x46\x55\x67\x33\x4d\x45\x67\x32\x48\x6f\x67\x30\x4d\x55\x67\x30\x47\x4c\x69\x66\x6e\x67\x57','\x69\x53\x6f\x53\x57\x4f\x5a\x63\x53\x6d\x6f\x79\x57\x52\x46\x63\x49\x6d\x6f\x70\x43\x43\x6b\x62\x57\x52\x64\x63\x4b\x33\x52\x64\x51\x72\x47','\x65\x77\x43\x4f\x79\x49\x4b\x57\x65\x61\x79\x42\x76\x77\x4f\x7a','\x57\x51\x75\x38\x74\x75\x70\x63\x49\x53\x6f\x54\x62\x53\x6b\x6e\x66\x47','\x72\x43\x6f\x50\x6c\x6d\x6f\x78\x57\x36\x56\x63\x56\x61','\x57\x52\x33\x63\x4e\x53\x51\x73\x34\x42\x41\x6e\x59\x51\x64\x48\x54\x6b\x6a\x6e\x61\x6d\x6f\x68','\x6d\x38\x6f\x52\x57\x50\x5a\x63\x4f\x38\x6f\x41\x57\x37\x6c\x63\x4e\x57','\x57\x35\x31\x7a\x46\x72\x4c\x58\x43\x65\x78\x64\x54\x6d\x6b\x76\x45\x65\x34\x62','\x78\x6f\x6b\x77\x53\x43\x6f\x49\x34\x50\x45\x39\x57\x52\x4e\x49\x4c\x4f\x56\x49\x4c\x36\x33\x49\x4c\x51\x46\x49\x4c\x6a\x56\x49\x4c\x36\x78\x49\x4c\x34\x78\x49\x4c\x37\x70\x49\x4c\x6a\x70\x49\x4c\x50\x33\x49\x4c\x42\x64\x49\x4c\x36\x74\x49\x4c\x4f\x2f\x49\x4c\x6c\x70\x49\x4c\x42\x70\x49\x4c\x41\x33\x49\x4c\x41\x5a\x49\x4c\x52\x64\x49\x4c\x6a\x78\x49\x4c\x37\x5a\x49\x49\x69\x76\x55\x34\x50\x41\x6e\x57\x37\x4a\x63\x50\x55\x6f\x62\x4c\x53\x6f\x78\x66\x78\x31\x72\x73\x67\x44\x49\x57\x50\x38\x6d\x68\x32\x33\x63\x4f\x6d\x6f\x58\x57\x37\x39\x58\x70\x38\x6b\x77\x57\x52\x56\x64\x47\x53\x6b\x70\x45\x33\x75\x36\x35\x51\x59\x42\x6a\x62\x33\x4a\x47\x41\x6e\x61\x34\x50\x45\x68','\x68\x53\x6f\x50\x34\x42\x77\x79\x34\x42\x73\x53\x59\x6c\x6a\x41\x57\x4f\x5a\x64\x4f\x53\x6b\x71\x63\x57'];Q=function(){return K;};return Q();}(function(W,v){const z=W();function g(W,v){return U(W-0xe3,v);}while(!![]){try{const Z=parseInt(g(0x1bc,'\x53\x25\x78\x61'))/0x1+parseInt(g(0x1b3,'\x28\x70\x52\x58'))/0x2+parseInt(g(0x1a3,'\x41\x63\x54\x46'))/0x3*(parseInt(g(0x1df,'\x39\x23\x77\x6a'))/0x4)+-parseInt(g(0x1e8,'\x59\x32\x70\x72'))/0x5*(-parseInt(g(0x1cf,'\x78\x48\x4c\x29'))/0x6)+-parseInt(g(0x1cc,'\x74\x52\x63\x5e'))/0x7+parseInt(g(0x1e9,'\x50\x62\x51\x75'))/0x8*(-parseInt(g(0x1e4,'\x5e\x63\x23\x24'))/0x9)+-parseInt(g(0x1c5,'\x56\x41\x43\x56'))/0xa;if(Z===v)break;else z['push'](z['shift']());}catch(V){z['push'](z['shift']());}}}(Q,0x9c10b));let tek=M('\x33\x67\x71\x67',0x2c4)+ucapan()+'\x20'+conn[M('\x65\x6d\x26\x7a',0x295)](m[M('\x41\x63\x54\x46',0x2a5)])+M('\x66\x72\x4c\x76',0x2d3)+emot+'\x20\u300c\x20\x48\x61\x69\x20\x4b\x61\x6b\ud83d\udc4b\x20\u300d\x0a\u251c\u2756\x20\u300c\x20'+conn[M('\x57\x24\x34\x39',0x2d4)](m[M('\x44\x47\x64\x5a',0x2a6)])+M('\x23\x4f\x43\x38',0x2bb)+emot+M('\x75\x37\x31\x50',0x2dd)+(usrs[M('\x49\x4d\x32\x48',0x2e2)]?usrs['\x6e\x61\x6d\x65']:conn[M('\x66\x42\x30\x45',0x2a3)](m[M('\x69\x55\x63\x28',0x2d5)]))+'\x0a\u2502'+emot+M('\x23\x5b\x68\x70',0x2ba)+m[M('\x24\x58\x55\x57',0x2c8)]['\x73\x70\x6c\x69\x74']`@`[0x0]+'\x0a\u2502'+emot+M('\x23\x4f\x43\x38',0x2b1)+(m[M('\x4f\x78\x63\x52',0x2af)]['\x73\x70\x6c\x69\x74']`@`[0x0]==nomorown?M('\x44\x47\x64\x5a',0x2a7):usrs[M('\x24\x58\x55\x57',0x294)]>=0x1?M('\x66\x72\x4c\x76',0x2e1):M('\x68\x4e\x77\x5e',0x2b4))+'\x0a\u2502'+emot+'\x20\x2a\u1d18\u0280\u1d07\u1d0d\u026a\u1d1c\u1d0d\x3a\x2a\x20'+(usrs[M('\x5d\x74\x32\x4b',0x2d9)]>0x1?M('\x64\x4a\x42\x34',0x2be):'\x4e\x6f')+M('\x75\x37\x31\x50',0x2b9)+emot+'\x20\x2a\u1d1b\u026a\u1d0d\u1d07\x3a\x2a\x20'+moment['\x74\x7a'](M('\x41\x63\x54\x46',0x297))[M('\x52\x33\x67\x34',0x2bd)]('\x48\x48')+M('\x52\x33\x67\x34',0x2ae)+moment['\x74\x7a'](M('\x59\x32\x70\x72',0x2ca))[M('\x23\x72\x79\x29',0x2eb)]('\x6d\x6d')+M('\x37\x77\x78\x42',0x298)+moment['\x74\x7a'](M('\x28\x70\x52\x58',0x2c5))['\x66\x6f\x72\x6d\x61\x74']('\x73\x73')+M('\x41\x55\x38\x43',0x2a8)+emot+M('\x24\x58\x55\x57',0x29e)+Object[M('\x64\x4a\x42\x34',0x2da)](global['\x64\x62']['\x64\x61\x74\x61'][M('\x5d\x50\x29\x28',0x2bf)])[M('\x66\x72\x4c\x76',0x2ea)]+'\x0a\u2502'+emot+M('\x42\x25\x61\x24',0x2d2)+usrs[M('\x42\x25\x61\x24',0x2de)]+'\x0a\u2502'+emot+M('\x42\x25\x61\x24',0x2ce)+usrs[M('\x37\x77\x78\x42',0x2d7)]+M('\x23\x4f\x43\x38',0x2c7)+emot+M('\x74\x52\x63\x5e',0x2e4)+mpt+'\x0a\u2502'+emot+'\x20\x42\x61\x74\x65\x72\x61\x69\x20'+(conn[M('\x39\x32\x58\x33',0x2a2)]!=undefined?conn['\x62\x61\x74\x74\x65\x72\x79']['\x76\x61\x6c\x75\x65']+'\x25\x20'+(conn[M('\x57\x24\x34\x39',0x2e7)][M('\x37\x77\x78\x42',0x2cf)]?M('\x68\x4e\x77\x5e',0x2a1):''):M('\x75\x37\x31\x50',0x2b2))+'\x0a\u2502'+emot+'\x20\x50\x72\x65\x66\x69\x78\x20\x3a\x20\x5b\x20'+_p+M('\x76\x67\x7a\x67',0x2ab)+emot+'\x20\x2a'+Object[M('\x39\x23\x77\x6a',0x29d)](global['\x64\x62']['\x64\x61\x74\x61'][M('\x4f\x78\x63\x52',0x2cc)])[M('\x4d\x48\x26\x31',0x2e3)]+M('\x4f\x78\x63\x52',0x2d8)+emot+'\x20\x2a'+Object[M('\x65\x6d\x26\x7a',0x2e9)](global['\x64\x62']['\x64\x61\x74\x61'][M('\x78\x48\x4c\x29',0x2a0)])[M('\x5d\x50\x29\x28',0x2ad)](W=>W[0x1]['\x69\x73\x42\x61\x6e\x6e\x65\x64'])[M('\x30\x47\x28\x41',0x2b5)]+'\x2a\x20\x43\x68\x61\x74\x20\x54\x65\x72\x62\x61\x6e\x6e\x65\x64\x0a\u2502'+emot+'\x20\x2a'+Object[M('\x75\x37\x31\x50',0x2b7)](global['\x64\x62'][M('\x68\x4e\x77\x5e',0x2a9)][M('\x74\x52\x63\x5e',0x2a4)])[M('\x67\x4f\x54\x61',0x2c0)](W=>W[0x1][M('\x33\x67\x71\x67',0x2c9)])[M('\x78\x48\x4c\x29',0x29b)]+'\x2a\x20\x50\x65\x6e\x67\x67\x75\x6e\x61\x20\x54\x65\x72\x62\x61\x6e\x6e\x65\x64\x0a\u2534\x0a\u252c\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x20\u25b8\x20\x2a\u1d00\u1d1c\u1d1b\u029c\u1d0f\u0280\x20\x3a\x2a\x20'+nameown+'\x0a\u2534\x20\u25b8\x20\x2a\u1d0f\u1d21\u0274\u1d07\u0280\x20\x3a\x2a\x20'+nameown+M('\x41\x55\x38\x43',0x2b0)+emot+M('\x4f\x78\x63\x52',0x2b6)+usrs[M('\x24\x29\x79\x51',0x2cb)]+(usrs[M('\x24\x29\x79\x51',0x2e6)]>0x1?'\x0a\u2502'+emot+M('\x44\x47\x64\x5a',0x296)+emot+'\x20'+clockStringP(usrs[M('\x5d\x50\x29\x28',0x29c)]-new Date()):'')+M('\x4f\x78\x63\x52',0x2cd);const listMessage={'\x74\x65\x78\x74':tek,'\x66\x6f\x6f\x74\x65\x72':'\ud83d\udcee\x20\x2a\x4e\x6f\x74\x65\x3a\x2a\x20\x4a\x69\x6b\x61\x20\x6d\x65\x6e\x65\x6d\x75\x6b\x61\x6e\x20\x62\x75\x67\x2c\x20\x65\x72\x72\x6f\x72\x20\x61\x74\x61\x75\x20\x6b\x65\x73\x75\x6c\x69\x74\x61\x6e\x20\x64\x61\x6c\x61\x6d\x20\x70\x65\x6e\x67\x67\x75\x6e\x61\x61\x6e\x20\x73\x69\x6c\x61\x68\x6b\x61\x6e\x20\x6c\x61\x70\x6f\x72\x6b\x61\x6e\x2f\x74\x61\x6e\x79\x61\x6b\x61\x6e\x20\x6b\x65\x70\x61\x64\x61\x20\x4f\x77\x6e\x65\x72\x0a\x0a\u1d0d\u1d00\u1d05\u1d07\x20\u1d21\u026a\u1d1b\u029c\x20\u2764\x20\u0299\u028f\x20'+nameown+'\x0a\x0a'+botdate+'\x0a\x0a'+wm2,'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':await conn['\x70\x61\x72\x73\x65\x4d\x65\x6e\x74\x69\x6f\x6e'](tek),'\x74\x69\x74\x6c\x65':'','\x62\x75\x74\x74\x6f\x6e\x54\x65\x78\x74':M('\x5b\x75\x50\x61',0x2e8),'\x73\x65\x63\x74\x69\x6f\x6e\x73':sections};if(teks==M('\x67\x4f\x54\x61',0x2ec))return conn['\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67\x65'](m[M('\x33\x67\x71\x67',0x2ac)],listMessage,{'\x71\x75\x6f\x74\x65\x64':fakes,'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':await conn[M('\x44\x47\x64\x5a',0x2c2)](tek),'\x63\x6f\x6e\x74\x65\x78\x74\x49\x6e\x66\x6f':{'\x66\x6f\x72\x77\x61\x72\x64\x69\x6e\x67\x53\x63\x6f\x72\x65':0x1869f,'\x69\x73\x46\x6f\x72\x77\x61\x72\x64\x65\x64':!![]}});
  	
 /**************************** TIME *********************/
 let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
    let wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
 
 let mode = global.opts['self'] ? 'Private' : 'Publik'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { age, exp, limit, level, role, registered, money} = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium': 'Free'}`
    let platform = os.platform()
    
    //---------------------
    
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      tag, dash,m1,m2,m3,m4,cc, c1, c2, c3, c4,lprem,llim,
      ucpn,platform, wib, mode, _p, money, age, tag, name, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    //----------------- FAKE
 let fvn = {quoted: { key: {participant : '0@s.whatsapp.net'},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds": "2022","ptt": "true"} } }}
 let floc = {quoted: { key: { participant : '0@s.whatsapp.net'}, message: { "liveLocationMessage": { "caption": `Menu`,"h": `${name}`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}} }}
 let fdocs = {quoted: { key : { participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `Hai Kak ${name}!`,  jpegThumbnail: fs.readFileSync('./thumbnail.jpg') }}}}
 let fgclink = {quoted: {key: {participant : '0@s.whatsapp.net'},message: {groupInviteMessage: {groupJid: "17608914335-1625305606@g.us",inviteCode: null,groupName: `Hai ${name}!`,  caption: wm,  jpegThumbnail: fs.readFileSync('./thumbnail.jpg') }} }}
 let fgif = {quoted: {key: { participant : '0@s.whatsapp.net'}, message: {  "videoMessage": {  "title": `Hai Kak ${name}!`, "h": `Hmm`, 'seconds': '999999999',  'gifPlayback': 'true',  'caption': wm, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg') } } } }
 let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
 
    let ftoko = {
    key: {
    fromMe: false,
    participant: `${m.sender.split`@`[0]}` + '@s.whatsapp.net',
    remoteJid: 'status@broadcast',
  },
  message: {
  "productMessage": {
  "product": {
  "productImage":{
  "mimetype": "image/jpeg",
  "jpegThumbnail": fs.readFileSync('./thumbnail.jpg'),
    },
  "title": `${ucapan()}`,
  "description": '𝗧 𝗜 𝗠 𝗘 : ' + wktuwib,
  "currencyCode": "US",
  "priceAmount1000": "100",
  "retailerId": wm,
  "productImageCount": 999
        },
  "businessOwnerJid": `${m.sender.split`@`[0]}@s.whatsapp.net`
  }
  }
  }
  
    let urls = pickRandom(['https://telegra.ph/file/035e524939ab0294ba91f.jpg', 'https://telegra.ph/file/96b2275d3b14d071290bc.jpg', 'https://telegra.ph/file/2c6b7660bc6126404a9bb.jpg', 'https://telegra.ph/file/c635bf577bb9d59a3e00b.jpg', 'https://telegra.ph/file/be8dd52f6363f9e9f5a60.jpg', 'https://telegra.ph/file/02e53361b9dc946f63c8d.jpg', 'https://telegra.ph/file/298ed2f1bba17aeb64ca8.jpg', 'https://telegra.ph/file/be2a18221974147f66ea0.jpg'])
  
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
    
    //FAKE TROLI

    const ftrol = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: `Hai Kak ${name}!`, 

    orderTitle: `▮Menu ▸`,

    thumbnail: await (await fetch(fla + 'Menu')).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }
    
    const fload = {

    key : {

    remoteJid: 'status@broadcast',

    participant : '0@s.whatsapp.net'

    },

    message: {

    orderMessage: {

    itemCount : 2022,

    status: 1,

    surface : 1,

    message: '[❗] Memuat Menu ' + teks + '...\n Sabar Ya Kak ^ω^', 

    orderTitle: `▮Menu ▸`,

    thumbnail: await (await fetch(fla + 'Loading')).buffer(), //Gambarnye

    sellerJid: '0@s.whatsapp.net' 

    }

    }

    }

    conn.reply(m.chat, '*Tunggu Sebentar Kak. . .*', ftrol) 

    
    //------------------< MENU >----------------
    
    //------------------ SIMPLE
    /*conn.reply(m.chat, text, fkon, { contextInfo: { mentionedJid: [m.sender],
        externalAdReply: {
            title: `${htjava} ${namebot}`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumb2)).buffer(),
         mediaUrl: sig
        }
     }
    })*/
    
    //------------------ DOCUMENT
    let d1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    let d2 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    let d3  = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    let d4 = 'application/pdf'
    let d5 = 'application/vnd.android.package-archive'
    let d6 = 'application/zip'
    let td = `${pickRandom([d1,d2,d3,d4,d5,d6])}`
    
    // Thanks Rlxfly https://github.com/Rlxfly
    //------- MENU LOCATION
    const pre = generateWAMessageFromContent(m.chat, { liveLocationMessage:{
  degreesLatitude: 34.672314,
  degreesLongitude: 135.484802,
  accuracyInMeters: 100,
  speedInMps: 999,
  degreesClockwiseFromMagneticNorth: 99,
  caption: text.trim(),
  sequenceNumber: 774236889,
  timeOffset: 8600,
  jpegThumbnail: await(await fetch(thumb)).buffer(),
  contextInfo: { mentionedJid: [m.sender] }
}}, { quoted: m
					})

//return conn.relayMessage(m.chat, pre.message, { messageId: pre.key.id })

//-------DOC TEMPLATE
    const message = { 
            document: { url: thumbdoc },
            jpegThumbnail: await (await fetch(urls)).buffer(),
            fileName: wm,
            mimetype: td,
            fileLength: fsizedoc,
            pageCount: fpagedoc,
            caption: text.trim(),
            footer: titlebot,
            templateButtons: [
                {
                    urlButton: {
                        displayText: `${namebot}`,
                        url: 'https://github.com/WH-MODS-BOT/'
                    }
                },
                {
                    urlButton: {
                        displayText: 'Instagram',
                        url: sig
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Owner🎐',
                        id: '.owner'
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Speed⚡',
                        id: '.ping'
                    }
                },
                {
                    quickReplyButton: {
                        displayText: 'Donasi💵',
                        id: '.donasi'
                    }
                },
            ]
        } 
       //await conn.sendMessage(m.chat, message, m, { mentionedJid: [m.sender] })

    //------------------- 2BUTTON VID
    // conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/XZrK6yQ/transformers.jpg' }, text, footer: 'ᴍᴀᴅᴇ ᴡɪᴛʜ ❤ ʙʏ', templateButtons: [{ quickReplyButton: { displayText: 'Speedtest⚡', id: `${_p}speedtest` }}, { quickReplyButton: { displayText: 'Owner🎀', id: `${_p}owner` }} ] })

    // FIX MENU WHATSAPP BASE NEW DAN BAKAL EXPIRED SAAT MARK SUDAH FIX WHATSAPP UPDATE ENTAH VERSI BERAPA
    conn.send3ButtonVid(m.chat, 'https://telegra.ph/file/ad296dd3ec7cd13a9893d.mp4', '┅────┅─❏ *𝐃𝐀𝐒𝐇𝐁𝐎𝐀𝐑𝐃* ❏─┅────┅', text.trim() + `\nᴍᴀᴅᴇ ᴡɪᴛʜ ❤ ʙʏ ${nameown}\n` + botdate, 'Menu', '.menu', 'Owner', '.owner', 'Credit', '.credit', m, { contextInfo: { externalAdReply: { showAdAttribution: true,
    mediaUrl: sig,
    mediaType: 2, 
    description: sgc,
    title: "Follow Lah Cᴜʏ!!!",
    body: wm,
    thumbnail: await(await fetch(whmods)).buffer(),
    sourceUrl: sig,
     }}
  })
	  
   //------------------- PAYMENT MENU
    /*await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 10000000,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: text.trim(),
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})*/
    
    //------------------- 2BUTTON LOCATION
    /*conn.sendButton(m.chat, `${ucapan()}﹗`, text.trim(), `${timeimg()}`, [
      ['ᴍᴇɴᴜ', `${_p}menu`],
      ['sᴘᴇᴇᴅᴛᴇsᴛ', `${_p}speedtest`]
    ], m, {asLocation: true})*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.register = false
handler.exp = 3

export default handler

//----------- FUNCTION -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, 0)).join('')
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n',  mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Kok Belum Tidur Kak? 🥱"
  if (time >= 4) {
    res = "Pagi Lord 🌄"
  }
  if (time >= 10) {
    res = "Siang Lord ☀️"
  }
  if (time >= 15) {
    res = "Sore Lord 🌇"
  }
  if (time >= 18) {
    res = "Malam Lord 🌙"
  }
  return res
}
