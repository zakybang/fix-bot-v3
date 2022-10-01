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

(function(_0x29563c,_0x229ebb){const _0x45d23f=_0x29563c();function _0x156264(_0xe0e6be,_0x392cf3){return _0x5df3(_0x392cf3-0xed,_0xe0e6be);}while(!![]){try{const _0x55b23c=-parseInt(_0x156264(0x247,0x243))/0x1+parseInt(_0x156264(0x268,0x269))/0x2*(parseInt(_0x156264(0x23a,0x246))/0x3)+-parseInt(_0x156264(0x248,0x261))/0x4*(parseInt(_0x156264(0x236,0x240))/0x5)+parseInt(_0x156264(0x25f,0x242))/0x6*(-parseInt(_0x156264(0x255,0x266))/0x7)+parseInt(_0x156264(0x252,0x25f))/0x8*(parseInt(_0x156264(0x261,0x276))/0x9)+-parseInt(_0x156264(0x255,0x24f))/0xa+parseInt(_0x156264(0x251,0x252))/0xb;if(_0x55b23c===_0x229ebb)break;else _0x45d23f['push'](_0x45d23f['shift']());}catch(_0x239427){_0x45d23f['push'](_0x45d23f['shift']());}}}(_0x110d,0x930eb));let tek=_0x5d3678(0x2d2,0x2b5)+ucapan()+'\x20'+conn[_0x5d3678(0x2b4,0x2b1)](m[_0x5d3678(0x28a,0x2a4)])+_0x5d3678(0x2ab,0x2aa)+emot+_0x5d3678(0x2cc,0x2c0)+conn['\x67\x65\x74\x4e\x61\x6d\x65'](m['\x73\x65\x6e\x64\x65\x72'])+_0x5d3678(0x2b4,0x2b9)+emot+_0x5d3678(0x2b4,0x2b2)+(usrs[_0x5d3678(0x2bc,0x2bd)]?usrs[_0x5d3678(0x2c8,0x2b3)]:conn['\x67\x65\x74\x4e\x61\x6d\x65'](m[_0x5d3678(0x2a5,0x2a4)]))+'\x0a\u2502'+emot+_0x5d3678(0x2db,0x2c1)+m[_0x5d3678(0x28a,0x2a4)]['\x73\x70\x6c\x69\x74']`@`[0x0]+'\x0a\u2502'+emot+'\x20\x2a\x73\u1d1b\u1d00\u1d1b\u1d1c\x73\x3a\x2a\x20'+(m[_0x5d3678(0x285,0x2a4)][_0x5d3678(0x2a9,0x2a3)]`@`[0x0]==nomorown?_0x5d3678(0x2e1,0x2c7):usrs[_0x5d3678(0x2ae,0x2bc)]>=0x1?_0x5d3678(0x28f,0x295):'\x46\x72\x65\x65\x20\x55\x73\x65\x72')+'\x0a\u2502'+emot+_0x5d3678(0x2b8,0x29a)+(usrs[_0x5d3678(0x2a7,0x2bc)]>0x1?_0x5d3678(0x284,0x29d):'\x4e\x6f')+'\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x20\x20\u300c\x20\x2a\x53\x20\x74\x20\x61\x20\x74\x20\x75\x20\x73\x20\x20\x49\x20\x6e\x20\x66\x20\x6f\x20\u6bd4\x2a\x20\u300d\x0a\u2502'+emot+'\x20\x2a\u1d1b\u026a\u1d0d\u1d07\x3a\x2a\x20'+moment['\x74\x7a']('\x41\x73\x69\x61\x2f\x4a\x61\x6b\x61\x72\x74\x61')[_0x5d3678(0x2c5,0x2bb)]('\x48\x48')+_0x5d3678(0x297,0x2a0)+moment['\x74\x7a'](_0x5d3678(0x2a6,0x2a6))['\x66\x6f\x72\x6d\x61\x74']('\x6d\x6d')+'\x20\x4d\x20\x20'+moment['\x74\x7a'](_0x5d3678(0x2be,0x2a6))[_0x5d3678(0x2da,0x2bb)]('\x73\x73')+_0x5d3678(0x29f,0x2b4)+emot+_0x5d3678(0x286,0x2a2)+Object[_0x5d3678(0x2e7,0x2cb)](global['\x64\x62'][_0x5d3678(0x27f,0x297)]['\x75\x73\x65\x72\x73'])[_0x5d3678(0x289,0x2a5)]+'\x0a\u2502'+emot+_0x5d3678(0x2dd,0x2cd)+usrs['\x6c\x69\x6d\x69\x74']+'\x0a\u2502'+emot+_0x5d3678(0x2ad,0x2c9)+usrs['\x6c\x65\x76\x65\x6c']+'\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x20\x20\u300c\x20\x2a\x49\x20\x6e\x20\x66\x20\x6f\x20\x20\x20\x42\x20\x6f\x20\x74\x20\u6bd4\x2a\x20\u300d\x0a\u2502'+emot+'\x20\x41\x6b\x74\x69\x66\x20\x73\x65\x6c\x61\x6d\x61\x20'+mpt+'\x0a\u2502'+emot+'\x20\x42\x61\x74\x65\x72\x61\x69\x20'+(conn[_0x5d3678(0x2c9,0x2ce)]!=undefined?conn[_0x5d3678(0x2c2,0x2ce)][_0x5d3678(0x292,0x2a1)]+'\x25\x20'+(conn[_0x5d3678(0x2bc,0x2ce)][_0x5d3678(0x2c7,0x2a9)]?'\ud83d\udd0c\x20\x70\x65\x6e\x67\x69\x73\x69\x61\x6e':''):_0x5d3678(0x2ad,0x2be))+'\x0a\u2502'+emot+_0x5d3678(0x2ac,0x2b6)+_p+_0x5d3678(0x2da,0x2cc)+emot+'\x20\x2a'+Object[_0x5d3678(0x2c8,0x2cb)](global['\x64\x62'][_0x5d3678(0x2af,0x297)][_0x5d3678(0x2c5,0x2ac)])['\x6c\x65\x6e\x67\x74\x68']+_0x5d3678(0x2ad,0x298)+emot+'\x20\x2a'+Object[_0x5d3678(0x27a,0x296)](global['\x64\x62'][_0x5d3678(0x297,0x297)][_0x5d3678(0x2e1,0x2c6)])[_0x5d3678(0x2d6,0x2c5)](_0x1fe6a9=>_0x1fe6a9[0x1][_0x5d3678(0x2c2,0x2c3)])[_0x5d3678(0x2a5,0x2a5)]+'\x2a\x20\x43\x68\x61\x74\x20\x54\x65\x72\x62\x61\x6e\x6e\x65\x64\x0a\u2502'+emot+'\x20\x2a'+Object['\x65\x6e\x74\x72\x69\x65\x73'](global['\x64\x62'][_0x5d3678(0x2a9,0x297)]['\x75\x73\x65\x72\x73'])[_0x5d3678(0x2ce,0x2c5)](_0x39d215=>_0x39d215[0x1][_0x5d3678(0x2ac,0x2b7)])[_0x5d3678(0x2a3,0x2a5)]+_0x5d3678(0x2e8,0x2d1)+nameown+'\x0a\u2534\x20\u25b8\x20\x2a\u1d0f\u1d21\u0274\u1d07\u0280\x20\x3a\x2a\x20'+nameown+_0x5d3678(0x2d2,0x2c8)+emot+_0x5d3678(0x2b7,0x2d0)+usrs[_0x5d3678(0x2b0,0x2ae)]+(usrs[_0x5d3678(0x2c4,0x2bc)]>0x1?'\x0a\u2502'+emot+_0x5d3678(0x2c1,0x2c4)+emot+'\x20'+clockStringP(usrs[_0x5d3678(0x29d,0x2bc)]-new Date()):'')+'\x0a\u2570\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u25c2';const listMessage={'\x74\x65\x78\x74':tek,'\x66\x6f\x6f\x74\x65\x72':_0x5d3678(0x2c7,0x2ad)+nameown+'\x0a\x0a'+botdate+'\x0a\x0a'+wm2,'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':await conn[_0x5d3678(0x2b4,0x29e)](tek),'\x74\x69\x74\x6c\x65':'','\x62\x75\x74\x74\x6f\x6e\x54\x65\x78\x74':_0x5d3678(0x2ba,0x2ca),'\x73\x65\x63\x74\x69\x6f\x6e\x73':sections};function _0x5d3678(_0x191bbb,_0x2eb0d5){return _0x5df3(_0x2eb0d5-0x146,_0x191bbb);}function _0x5df3(_0x4db6c8,_0x1ff67e){const _0x110d7d=_0x110d();return _0x5df3=function(_0x5df3ed,_0x2f49c0){_0x5df3ed=_0x5df3ed-0x14f;let _0x172901=_0x110d7d[_0x5df3ed];return _0x172901;},_0x5df3(_0x4db6c8,_0x1ff67e);}function _0x110d(){const _0x9b2207=['\x20\x53\x0a\u2502','\u2727\u2500\u2500\u2500\u2500\u00b7\u00b7\u00b7\x5b\x20\x44\x61\x73\x68\x62\x6f\x61\x72\x64\x20\x5d\u00b7\u00b7\u00b7\u2500\u2500\u2500\u2500\u2727\x0a\x2a','\x20\x50\x72\x65\x66\x69\x78\x20\x3a\x20\x5b\x20','\x62\x61\x6e\x6e\x65\x64','\x35\x33\x33\x34\x34\x4c\x51\x4c\x72\x52\x77','\x20\u300d\x0a\u251c\u2756\x20\x20\x42\x61\x67\x61\x69\x6d\x61\x6e\x61\x20\x48\x61\x72\x69\x6d\x75\x3f\x20\ud83d\ude04\x0a\u251c\u2756\x20\x20\x54\x65\x72\x69\x6d\x61\x20\x4b\x61\x73\x69\x68\x20\x54\x65\x6c\x61\x68\x20\x4d\x65\x6e\x67\x67\x75\x6e\x61\x6b\x61\x6e\x20\x42\x6f\x74\x20\x4b\x61\x6d\x69\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x20\x20\u300c\x20\x2a\x55\x20\x73\x20\x65\x20\x72\x20\x20\x49\x20\x6e\x20\x66\x20\x6f\x20\u514b\x2a\x20\u300d\x0a\u2502','\x37\x36\x33\x38\x38\x79\x66\x75\x52\x4f\x55','\x66\x6f\x72\x6d\x61\x74','\x70\x72\x65\x6d\x69\x75\x6d\x54\x69\x6d\x65','\x72\x65\x67\x69\x73\x74\x65\x72\x65\x64','\x74\x69\x64\x61\x6b\x20\x64\x69\x6b\x65\x74\x61\x68\x75\x69','\x36\x36\x38\x38\x30\x31\x6c\x65\x64\x68\x56\x53','\x20\u300c\x20\x48\x61\x69\x20\x4b\x61\x6b\ud83d\udc4b\x20\u300d\x0a\u251c\u2756\x20\u300c\x20','\x20\x2a\u1d1b\u1d00\u0262\x73\x3a\x2a\x20\x40','\x35\x36\x33\x38\x30\x54\x6a\x61\x47\x4f\x74','\x69\x73\x42\x61\x6e\x6e\x65\x64','\x20\x2a\u1d07\x78\u1d18\u026a\u0280\u1d07\u1d05\x20\u1d18\u0280\u1d07\u1d0d\u026a\u1d1c\u1d0d\x3a\x2a\x0a\u2502','\x66\x69\x6c\x74\x65\x72','\x63\x68\x61\x74\x73','\x44\x65\x76\x65\x6c\x6f\x70\x65\x72','\x0a\u2727\x0a\u252c\x20\ud83d\udccc\x20\ud835\udde3\ud835\uddf6\ud835\uddfb\ud835\uddfb\ud835\uddf2\ud835\uddf1\x20\x3a\x0a\u2502\x20\u0299\u1d07\u0280\u026a\x20\u1d0a\u1d07\u1d05\u1d00\x20\u028f\u1d00\u029c\x20\u1d0b\u1d00\u1d0b\x20\x5e\u03c9\x5e\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502','\x20\x2a\u029f\u1d07\u1d20\u1d07\u029f\x3a\x2a\x20','\x43\x4c\x49\x43\x4b\x20\x48\x45\x52\x45\x20\u2399','\x6b\x65\x79\x73','\x20\x5d\x0a\u2502','\x20\x2a\u029f\u026a\u1d0d\u026a\u1d1b\x3a\x2a\x20','\x62\x61\x74\x74\x65\x72\x79','\x34\x35\x39\x6c\x75\x6d\x6c\x70\x67','\x20\x2a\u0280\u1d0f\u029f\u1d07\x3a\x2a\x20','\x2a\x20\x50\x65\x6e\x67\x67\x75\x6e\x61\x20\x54\x65\x72\x62\x61\x6e\x6e\x65\x64\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x0a\u2502\x20\u25b8\x20\x2a\x53\x75\x6d\x62\x65\x72\x20\x3a\x2a\x20\x59\x6f\x75\x54\x75\x62\x65\x20\x57\x48\x2d\x4d\x4f\x44\x53\x2d\x44\x45\x56\x0a\u2502\x20\u25b8\x20\x2a\u1d00\u1d1c\u1d1b\u029c\u1d0f\u0280\x20\x3a\x2a\x20','\x50\x72\x65\x6d\x69\x75\x6d\x20\x55\x73\x65\x72','\x65\x6e\x74\x72\x69\x65\x73','\x64\x61\x74\x61','\x2a\x20\x50\x65\x6e\x67\x67\x75\x6e\x61\x0a\u2502','\x31\x38\x30\x51\x52\x43\x78\x46\x55','\x20\x2a\u1d18\u0280\u1d07\u1d0d\u026a\u1d1c\u1d0d\x3a\x2a\x20','\x34\x32\x7a\x75\x53\x49\x71\x4c','\x37\x31\x30\x30\x31\x32\x69\x6a\x77\x76\x51\x58','\x59\x65\x73','\x70\x61\x72\x73\x65\x4d\x65\x6e\x74\x69\x6f\x6e','\x34\x38\x6e\x6a\x79\x6a\x64\x70','\x20\x48\x20\x20','\x76\x61\x6c\x75\x65','\x20\x2a\u1d1c\x73\u1d07\u0280\x73\x3a\x2a\x20','\x73\x70\x6c\x69\x74','\x73\x65\x6e\x64\x65\x72','\x6c\x65\x6e\x67\x74\x68','\x41\x73\x69\x61\x2f\x4a\x61\x6b\x61\x72\x74\x61','\x63\x68\x61\x74','\x39\x32\x36\x38\x30\x37\x30\x6b\x6c\x6f\x66\x79\x62','\x6c\x69\x76\x65','\x2a\x0a\u256d\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u2727\x0a\u2534\x0a\u252c\x0a\u2502','\x33\x30\x38\x34\x37\x38\x36\x31\x50\x64\x63\x61\x50\x78','\x75\x73\x65\x72\x73','\ud83d\udcee\x20\x2a\x4e\x6f\x74\x65\x3a\x2a\x20\x4a\x69\x6b\x61\x20\x6d\x65\x6e\x65\x6d\x75\x6b\x61\x6e\x20\x62\x75\x67\x2c\x20\x65\x72\x72\x6f\x72\x20\x61\x74\x61\x75\x20\x6b\x65\x73\x75\x6c\x69\x74\x61\x6e\x20\x64\x61\x6c\x61\x6d\x20\x70\x65\x6e\x67\x67\x75\x6e\x61\x61\x6e\x20\x73\x69\x6c\x61\x68\x6b\x61\x6e\x20\x6c\x61\x70\x6f\x72\x6b\x61\x6e\x2f\x74\x61\x6e\x79\x61\x6b\x61\x6e\x20\x6b\x65\x70\x61\x64\x61\x20\x4f\x77\x6e\x65\x72\x0a\x0a\u1d0d\u1d00\u1d05\u1d07\x20\u1d21\u026a\u1d1b\u029c\x20\u2764\x20\u0299\u028f\x20','\x72\x6f\x6c\x65','\x73\x65\x6e\x64\x4d\x65\x73\x73\x61\x67\x65','\x34\x30\x34','\x67\x65\x74\x4e\x61\x6d\x65','\x20\x2a\u0274\u1d00\u1d0d\u1d07\x3a\x2a\x20','\x6e\x61\x6d\x65'];_0x110d=function(){return _0x9b2207;};return _0x110d();}if(teks==_0x5d3678(0x2a7,0x2b0))return conn[_0x5d3678(0x299,0x2af)](m[_0x5d3678(0x2bd,0x2a7)],listMessage,{'\x71\x75\x6f\x74\x65\x64':fakes,'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':await conn['\x70\x61\x72\x73\x65\x4d\x65\x6e\x74\x69\x6f\x6e'](tek),'\x63\x6f\x6e\x74\x65\x78\x74\x49\x6e\x66\x6f':{'\x66\x6f\x72\x77\x61\x72\x64\x69\x6e\x67\x53\x63\x6f\x72\x65':0x1869f,'\x69\x73\x46\x6f\x72\x77\x61\x72\x64\x65\x64':!![]}});

// KNP DI ENC? BIAR KGK DI RECODE SAMA YANG JUAL SC SEMBARANGAN PADAHAL FREE BISA LIHAT DI YT SAYA WH MODS DEV

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
    // MAU YANG NO ENC 10K AJA , MINAT PC GW wa.me/6282127487538
    
    // MAU YANG NO ENC MENFESS BALAS NAMBAH 5K :)
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
