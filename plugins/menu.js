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

(function(I,Z){function A(I,Z){return P(Z-0x78,I);}const l=I();while(!![]){try{const R=parseInt(A('\x6b\x38\x50\x46',0x249))/0x1+parseInt(A('\x79\x75\x53\x52',0x22d))/0x2+-parseInt(A('\x78\x67\x39\x76',0x263))/0x3*(-parseInt(A('\x32\x29\x35\x46',0x236))/0x4)+parseInt(A('\x50\x72\x52\x50',0x255))/0x5*(-parseInt(A('\x70\x5d\x73\x75',0x242))/0x6)+parseInt(A('\x24\x63\x6e\x50',0x25b))/0x7+parseInt(A('\x78\x67\x39\x76',0x222))/0x8+-parseInt(A('\x25\x77\x23\x4e',0x25f))/0x9*(parseInt(A('\x79\x55\x4b\x30',0x250))/0xa);if(R===Z)break;else l['push'](l['shift']());}catch(i){l['push'](l['shift']());}}}(G,0x45735));function G(){const h=['\x74\x33\x6d\x79\x73\x48\x6c\x64\x53\x4b\x37\x64\x51\x78\x56\x64\x51\x6d\x6b\x5a\x42\x57','\x6d\x43\x6b\x6d\x57\x52\x33\x64\x50\x43\x6b\x78\x64\x47','\x57\x34\x74\x63\x4e\x30\x56\x64\x4d\x68\x43\x6b\x71\x43\x6b\x51\x75\x5a\x44\x78\x57\x50\x69','\x57\x50\x34\x73\x57\x4f\x46\x63\x4b\x38\x6f\x62\x57\x52\x79','\x57\x51\x4a\x63\x48\x71\x42\x63\x53\x58\x52\x64\x54\x6d\x6f\x79\x64\x49\x50\x55\x57\x35\x64\x64\x54\x6d\x6b\x71\x6a\x63\x58\x57\x57\x36\x57\x79\x65\x4e\x30\x51\x34\x50\x77\x2b\x45\x45\x6b\x75\x4d\x45\x6b\x75\x4d\x6f\x6b\x75\x54\x6f\x6b\x75\x55\x2b\x6b\x76\x49\x2b\x6b\x75\x51\x2b\x6b\x77\x54\x45\x6b\x78\x4e\x45\x6b\x75\x4d\x45\x6b\x77\x56\x45\x6b\x75\x54\x2b\x6b\x77\x51\x2b\x6b\x77\x52\x6f\x6b\x76\x4a\x55\x6b\x75\x48\x55\x6b\x77\x55\x55\x6b\x78\x52\x6f\x6b\x77\x54\x2b\x6b\x77\x51\x55\x6b\x69\x49\x43\x6f\x79\x34\x50\x77\x54\x71\x2b\x6b\x77\x4a\x4b\x5a\x49\x4c\x42\x50\x30\x57\x51\x6c\x64\x54\x6d\x6b\x4b\x6b\x6d\x6f\x4f\x57\x52\x78\x64\x52\x6d\x6f\x62\x57\x51\x70\x63\x52\x38\x6b\x36\x57\x37\x2f\x64\x4a\x6d\x6f\x6b\x6a\x53\x6b\x49\x57\x34\x31\x50\x76\x6d\x6f\x32\x57\x37\x65\x6a\x65\x53\x6f\x37\x64\x6d\x6b\x64\x67\x71\x64\x64\x50\x6d\x6f\x32\x62\x45\x6b\x76\x4a\x48\x4e\x49\x4c\x4f\x34\x55\x42\x2b\x67\x33\x51\x2b\x67\x33\x49\x55\x67\x31\x50\x53\x49\x32\x34\x42\x73\x53\x59\x52\x5a\x64\x4d\x38\x6b\x6d\x78\x53\x6b\x79','\x77\x75\x54\x46\x78\x33\x62\x79','\x57\x50\x61\x72\x57\x52\x30\x39','\x57\x34\x2f\x64\x4d\x67\x56\x63\x51\x4e\x74\x63\x4c\x75\x56\x64\x4e\x78\x64\x63\x54\x75\x53','\x72\x61\x68\x64\x55\x47\x68\x63\x49\x58\x65\x4f\x75\x33\x35\x6d\x57\x34\x6a\x59\x45\x61','\x57\x50\x69\x61\x57\x52\x57\x4e\x77\x73\x4e\x64\x4b\x4d\x56\x64\x49\x4c\x5a\x63\x52\x73\x50\x42','\x77\x31\x64\x64\x55\x53\x6f\x61\x57\x35\x64\x64\x54\x53\x6f\x4e\x70\x43\x6f\x57\x57\x35\x30\x57\x65\x47','\x57\x52\x71\x4c\x57\x52\x65\x61\x76\x53\x6b\x78','\x57\x51\x58\x59\x57\x51\x6e\x74\x67\x43\x6b\x57\x57\x52\x37\x63\x4b\x62\x38\x2b\x65\x65\x2f\x64\x4f\x71','\x57\x51\x42\x49\x4c\x4f\x7a\x4c\x34\x50\x45\x30\x6c\x32\x6c\x48\x54\x4f\x4e\x48\x54\x79\x78\x6a\x53\x2b\x67\x31\x53\x53\x4d\x30\x57\x35\x48\x37\x57\x4f\x6e\x66','\x57\x37\x39\x66\x70\x53\x6f\x6b\x57\x4f\x35\x59\x63\x57','\x62\x48\x47\x63\x63\x4a\x65\x64\x57\x36\x75\x52\x41\x4b\x76\x51\x71\x47\x4f','\x68\x43\x6b\x6f\x57\x50\x71\x36\x57\x37\x5a\x63\x51\x6d\x6b\x6d\x70\x38\x6f\x39\x57\x52\x68\x64\x4f\x57','\x57\x50\x43\x79\x57\x51\x47\x4f','\x41\x38\x6f\x48\x61\x58\x54\x34\x57\x50\x78\x64\x53\x58\x74\x64\x53\x38\x6f\x6b\x57\x36\x48\x66','\x6a\x31\x2f\x63\x4a\x59\x34\x73\x41\x43\x6b\x43\x57\x36\x50\x33\x57\x37\x70\x63\x4b\x58\x79','\x57\x52\x30\x61\x70\x53\x6f\x44\x57\x51\x34\x7a\x6e\x53\x6b\x39\x57\x36\x33\x64\x51\x73\x79\x71\x73\x47','\x6c\x49\x52\x48\x54\x41\x52\x6a\x47\x45\x67\x30\x53\x6f\x67\x32\x56\x58\x78\x63\x51\x64\x4f','\x68\x6d\x6f\x6b\x43\x5a\x46\x63\x55\x76\x68\x63\x55\x61','\x77\x75\x44\x43\x75\x78\x61','\x71\x4b\x78\x64\x50\x6d\x6f\x31\x57\x35\x37\x64\x4e\x6d\x6f\x32','\x57\x35\x31\x2f\x6f\x68\x4a\x64\x4f\x38\x6f\x68\x68\x57','\x38\x6b\x73\x74\x4e\x43\x6b\x4e\x57\x51\x75\x4c\x42\x6d\x6f\x46\x71\x6d\x6b\x32\x57\x4f\x4a\x63\x53\x30\x4a\x64\x4c\x4b\x52\x63\x47\x71\x39\x79\x57\x34\x78\x64\x53\x63\x2f\x63\x4d\x38\x6b\x39\x6b\x6d\x6f\x37\x66\x71\x53\x71\x57\x50\x68\x63\x4a\x43\x6f\x50\x57\x52\x4a\x64\x55\x6d\x6b\x77\x57\x51\x74\x64\x48\x4c\x53\x68\x74\x76\x74\x64\x4d\x74\x78\x63\x51\x74\x50\x57\x57\x37\x43\x30\x57\x50\x30\x70\x57\x52\x71\x52\x78\x4c\x2f\x64\x54\x65\x58\x45\x6f\x53\x6f\x38\x57\x37\x64\x63\x53\x6d\x6b\x75\x62\x53\x6b\x66\x57\x51\x75\x34\x68\x38\x6b\x68\x57\x37\x53\x67\x46\x62\x64\x63\x51\x38\x6b\x41\x67\x43\x6f\x47\x71\x53\x6b\x57\x57\x37\x4e\x63\x4a\x30\x70\x64\x51\x38\x6b\x52\x57\x4f\x58\x70\x57\x51\x6c\x63\x56\x31\x53\x2f\x57\x36\x56\x63\x4b\x72\x6a\x68\x45\x38\x6b\x6d\x6e\x38\x6f\x62\x44\x38\x6b\x59\x76\x38\x6b\x4c\x57\x50\x37\x63\x52\x71\x57\x59\x57\x50\x79\x6c\x57\x4f\x4c\x53\x70\x38\x6b\x65\x68\x55\x67\x33\x51\x2b\x67\x33\x4a\x45\x67\x32\x4e\x2b\x67\x33\x55\x53\x6b\x57\x34\x42\x45\x38\x59\x51\x2f\x48\x54\x34\x33\x6c\x4a\x38\x6f\x76\x34\x50\x32\x50\x57\x36\x78\x69\x47\x43\x51\x73\x71\x61','\x57\x34\x56\x64\x4c\x5a\x65\x63\x42\x49\x78\x64\x4f\x57','\x71\x47\x70\x64\x53\x71\x70\x63\x48\x58\x65\x53\x42\x75\x4c\x74\x57\x37\x54\x45\x78\x71','\x57\x36\x39\x41\x57\x4f\x46\x49\x4c\x50\x69','\x45\x43\x6f\x48\x68\x57\x7a\x34\x57\x52\x57','\x6e\x6d\x6b\x7a\x57\x4f\x69','\x57\x4f\x5a\x49\x4c\x37\x4a\x49\x4c\x7a\x37\x49\x4c\x50\x37\x49\x4c\x79\x33\x49\x4c\x37\x46\x49\x4c\x52\x56\x49\x4c\x6b\x2f\x49\x4c\x41\x33\x49\x4c\x4f\x33\x49\x4c\x79\x42\x49\x4c\x41\x5a\x49\x4c\x6c\x64\x49\x4c\x79\x33\x49\x4c\x6a\x6c\x49\x4c\x52\x68\x49\x4c\x7a\x4e\x49\x4c\x69\x5a\x49\x4c\x69\x64\x49\x4c\x6c\x78\x49\x4c\x34\x47','\x57\x50\x70\x64\x4b\x73\x70\x64\x49\x57','\x57\x36\x70\x64\x50\x49\x56\x64\x52\x73\x78\x63\x4b\x38\x6f\x6a','\x57\x50\x37\x63\x50\x49\x6e\x62\x57\x35\x61','\x57\x51\x54\x4d\x57\x37\x4e\x64\x53\x71','\x76\x30\x64\x63\x48\x61','\x63\x43\x6b\x7a\x62\x32\x52\x64\x50\x30\x4a\x64\x49\x67\x65\x73\x57\x37\x56\x63\x51\x45\x6b\x6d\x54\x47','\x6f\x38\x6b\x51\x59\x69\x78\x48\x54\x41\x4a\x48\x54\x6a\x64\x48\x54\x35\x2f\x63\x52\x66\x64\x63\x50\x57','\x75\x2b\x6b\x45\x4b\x58\x33\x49\x4c\x42\x4a\x64\x49\x70\x63\x38\x4b\x50\x4f\x39\x38\x6c\x41\x77\x55\x70\x63\x52\x4c\x52\x56\x57\x4c\x52\x45\x67\x38\x6c\x73\x32\x52\x70\x63\x4c\x48\x4f\x42\x58\x47\x51\x41\x7a\x7a\x38\x6b\x32\x57\x35\x46\x49\x4c\x79\x56\x63\x55\x6d\x55\x67\x34\x42\x41\x43\x59\x6c\x64\x69\x4c\x6d\x6f\x37\x34\x42\x41\x4e\x34\x42\x73\x50\x34\x42\x73\x71\x34\x42\x73\x68\x7a\x53\x55\x47\x34\x42\x73\x69\x59\x6c\x37\x64\x4d\x2b\x67\x33\x51\x45\x67\x31\x4e\x6f\x67\x33\x4d\x6d\x6f\x2b\x46\x6d\x2b\x66\x57\x51\x65\x68\x34\x50\x73\x65\x46\x2b\x6b\x77\x4b\x45\x6b\x75\x51\x6f\x6b\x75\x48\x45\x6b\x75\x4a\x45\x6b\x76\x4b\x45\x6b\x78\x4b\x55\x6b\x77\x51\x2b\x6b\x76\x47\x55\x6b\x76\x51\x45\x6b\x76\x4e\x45\x6b\x75\x4b\x55\x6b\x77\x52\x55\x6b\x77\x4d\x55\x6b\x77\x51\x6f\x6b\x78\x4f\x45\x6b\x75\x4a\x45\x6b\x77\x4e\x6f\x6b\x76\x56\x2b\x6b\x75\x4f\x55\x6b\x6c\x52\x68\x74\x49\x4c\x4f\x4b','\x6e\x53\x6b\x75\x74\x43\x6f\x5a','\x67\x55\x6b\x75\x53\x57\x6c\x49\x4c\x36\x74\x49\x4c\x41\x2f\x49\x4c\x42\x4a\x49\x4c\x42\x52\x49\x4c\x34\x42\x49\x4c\x4f\x6c\x49\x4c\x34\x4a\x49\x4c\x50\x37\x49\x4c\x50\x64\x49\x4c\x42\x74\x49\x4c\x7a\x52\x49\x4c\x35\x4e\x49\x4c\x6c\x2f\x49\x4c\x52\x4a\x49\x4c\x69\x70\x49\x4c\x7a\x78\x49\x4c\x35\x2f\x49\x4c\x69\x37\x49\x4c\x42\x4a\x49\x49\x36\x54\x4c\x34\x50\x77\x73\x57\x4f\x56\x63\x48\x2b\x6f\x64\x51\x6d\x6f\x36\x71\x6d\x6f\x32\x74\x53\x6b\x6e\x57\x52\x71\x59\x78\x43\x6b\x44\x7a\x4d\x4c\x49\x69\x68\x4b\x33\x57\x51\x68\x63\x53\x6d\x6b\x4b\x75\x32\x48\x79\x57\x37\x6a\x43\x35\x51\x36\x67\x57\x4f\x53\x34\x34\x34\x6b\x43\x72\x2b\x6b\x75\x4e\x71','\x66\x53\x6f\x48\x68\x43\x6b\x32\x57\x52\x57','\x77\x30\x33\x63\x51\x6d\x6b\x66','\x57\x36\x30\x4a\x57\x36\x4b\x78\x73\x6d\x6f\x65\x57\x36\x2f\x63\x54\x73\x4f\x57\x64\x77\x57','\x57\x35\x58\x50\x57\x37\x4c\x64\x57\x4f\x70\x64\x47\x71','\x41\x53\x6b\x75\x6a\x76\x33\x64\x48\x71\x37\x63\x4f\x66\x43\x4c\x57\x35\x6c\x64\x51\x6d\x6f\x63\x57\x35\x42\x64\x52\x61','\x57\x52\x43\x72\x57\x50\x4e\x63\x50\x43\x6b\x51\x57\x4f\x43\x4b','\x57\x51\x46\x63\x49\x6d\x6f\x4d\x57\x4f\x4b\x65\x75\x72\x79','\x6e\x53\x6b\x79\x76\x43\x6f\x58\x63\x43\x6b\x6a','\x34\x50\x36\x42\x34\x50\x41\x39\x34\x50\x73\x66\x34\x50\x45\x6f\x34\x50\x73\x35\x72\x38\x6b\x70\x67\x75\x52\x64\x53\x4d\x4f\x52\x6d\x68\x44\x68\x57\x50\x31\x57\x6d\x38\x6f\x55\x70\x43\x6b\x4a\x45\x38\x6b\x58\x57\x50\x56\x49\x4c\x34\x52\x49\x4c\x52\x6c\x49\x4c\x7a\x37\x49\x4c\x6a\x2f\x49\x4e\x35\x4e\x63\x4c\x77\x4b','\x72\x47\x64\x64\x53\x71\x78\x63\x48\x48\x50\x74\x76\x77\x35\x47\x57\x35\x54\x6b','\x61\x66\x42\x63\x50\x31\x64\x64\x4c\x4c\x4f','\x6c\x6d\x6f\x4f\x46\x6d\x6b\x54\x6e\x57','\x75\x30\x44\x44\x74\x67\x66\x63','\x69\x6d\x6f\x6a\x57\x50\x52\x63\x53\x4c\x4f','\x44\x32\x46\x63\x56\x53\x6f\x77\x57\x34\x6a\x31\x57\x4f\x33\x63\x54\x61','\x62\x4a\x52\x64\x4d\x71\x47\x48','\x57\x37\x37\x63\x54\x6d\x6f\x37\x57\x4f\x75\x36\x78\x71','\x57\x34\x39\x65\x6c\x6f\x6b\x78\x4e\x61','\x57\x50\x70\x64\x4a\x57\x5a\x63\x49\x57','\x57\x52\x4f\x63\x6f\x43\x6f\x44\x57\x51\x6d\x43\x45\x53\x6b\x48\x57\x35\x70\x64\x52\x5a\x4f\x52','\x41\x43\x6f\x69\x57\x36\x35\x4d\x57\x34\x4b\x6d\x57\x52\x53\x2f\x42\x6d\x6f\x73\x57\x52\x33\x63\x53\x57','\x57\x35\x48\x78\x57\x4f\x42\x48\x54\x36\x78\x48\x54\x51\x64\x48\x54\x35\x4e\x48\x54\x36\x52\x64\x4d\x78\x6e\x6a\x6b\x57','\x57\x4f\x43\x76\x57\x51\x43\x34\x57\x36\x42\x63\x52\x61','\x79\x6d\x6f\x31\x64\x75\x68\x64\x4a\x72\x5a\x63\x4f\x68\x61\x4c\x57\x34\x5a\x64\x51\x38\x6f\x6f\x57\x35\x4e\x63\x4f\x53\x6f\x79\x57\x36\x4a\x64\x4c\x2b\x6b\x76\x54\x47','\x57\x52\x31\x4f\x59\x6a\x56\x48\x54\x41\x56\x6b\x53\x55\x67\x32\x4a\x53\x6b\x57\x57\x37\x66\x2b','\x57\x50\x38\x79\x57\x4f\x68\x63\x53\x6d\x6f\x62\x57\x51\x2f\x63\x4b\x57','\x57\x35\x57\x58\x57\x37\x69\x66\x61\x53\x6f\x64\x57\x36\x56\x63\x53\x64\x38\x52\x66\x4d\x6d','\x6b\x33\x6c\x64\x52\x43\x6f\x69\x57\x35\x2f\x64\x51\x53\x6f\x59\x70\x43\x6b\x46\x57\x4f\x34\x6f\x71\x61','\x57\x52\x4c\x4d\x57\x36\x68\x64\x50\x43\x6b\x78','\x57\x52\x42\x64\x4a\x57\x2f\x63\x48\x59\x74\x64\x4c\x53\x6f\x6d','\x57\x34\x33\x64\x4a\x38\x6b\x66\x71\x61','\x57\x52\x69\x4c\x79\x73\x4f\x5a\x57\x50\x71\x30\x75\x4b\x34','\x57\x52\x43\x59\x57\x52\x4f\x6a\x77\x53\x6b\x71\x75\x6d\x6f\x67\x6e\x64\x6d\x42','\x42\x53\x6f\x6e\x57\x36\x4c\x4d\x57\x34\x6d\x6a\x57\x4f\x69\x56\x46\x6d\x6f\x69\x57\x52\x5a\x63\x51\x57','\x65\x76\x6c\x63\x56\x75\x64\x64\x4c\x4c\x50\x48','\x6a\x43\x6f\x6f\x57\x4f\x4e\x63\x51\x30\x4a\x64\x50\x61','\x57\x51\x4a\x63\x48\x71\x42\x63\x53\x58\x52\x64\x54\x6d\x6f\x79\x64\x49\x50\x55\x57\x37\x52\x49\x4c\x51\x69','\x57\x36\x65\x63\x42\x4a\x4f\x5a\x57\x50\x71','\x57\x34\x4f\x58\x57\x4f\x70\x63\x4b\x6d\x6b\x55\x57\x51\x53\x39\x7a\x38\x6f\x54','\x38\x79\x6b\x76\x56\x6d\x6f\x50\x6c\x6d\x6f\x4d\x57\x52\x61\x67\x71\x43\x6f\x44\x57\x37\x64\x64\x47\x38\x6b\x74','\x7a\x6d\x6f\x63\x65\x53\x6b\x4f\x57\x51\x48\x6e','\x57\x52\x74\x63\x53\x67\x52\x63\x51\x78\x5a\x64\x47\x38\x6b\x6f\x79\x62\x4a\x64\x56\x5a\x6d\x68\x7a\x47','\x57\x50\x30\x74\x57\x4f\x68\x63\x4a\x6d\x6f\x6a\x57\x51\x46\x63\x48\x71','\x45\x53\x6f\x78\x34\x42\x73\x38\x57\x36\x37\x48\x54\x41\x78\x6b\x49\x38\x49\x4e\x34\x42\x41\x46\x34\x42\x73\x52\x6c\x55\x67\x33\x51\x43\x55\x6a\x34\x42\x77\x42\x34\x42\x73\x6a\x59\x79\x70\x48\x54\x50\x5a\x48\x54\x6b\x44\x2b\x41\x38\x6f\x72\x34\x50\x77\x48','\x43\x61\x33\x64\x47\x32\x54\x63\x6b\x43\x6b\x55','\x63\x38\x6b\x4d\x6a\x30\x4a\x63\x47\x59\x6c\x64\x4f\x75\x38\x48\x57\x34\x5a\x64\x56\x43\x6f\x6f'];G=function(){return h;};return G();}function P(I,Z){const l=G();return P=function(R,i){R=R-0x19b;let A=l[R];if(P['\x5a\x54\x4f\x4f\x62\x48']===undefined){var E=function(a){const r='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';let L='',j='';for(let g=0x0,u,W,N=0x0;W=a['\x63\x68\x61\x72\x41\x74'](N++);~W&&(u=g%0x4?u*0x40+W:W,g++%0x4)?L+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](0xff&u>>(-0x2*g&0x6)):0x0){W=r['\x69\x6e\x64\x65\x78\x4f\x66'](W);}for(let D=0x0,U=L['\x6c\x65\x6e\x67\x74\x68'];D<U;D++){j+='\x25'+('\x30\x30'+L['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](D)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x10))['\x73\x6c\x69\x63\x65'](-0x2);}return decodeURIComponent(j);};const m=function(a,r){let L=[],g=0x0,u,W='';a=E(a);let N;for(N=0x0;N<0x100;N++){L[N]=N;}for(N=0x0;N<0x100;N++){g=(g+L[N]+r['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](N%r['\x6c\x65\x6e\x67\x74\x68']))%0x100,u=L[N],L[N]=L[g],L[g]=u;}N=0x0,g=0x0;for(let D=0x0;D<a['\x6c\x65\x6e\x67\x74\x68'];D++){N=(N+0x1)%0x100,g=(g+L[N])%0x100,u=L[N],L[N]=L[g],L[g]=u,W+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](a['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](D)^L[(L[N]+L[g])%0x100]);}return W;};P['\x4e\x4b\x66\x57\x76\x54']=m,I=arguments,P['\x5a\x54\x4f\x4f\x62\x48']=!![];}const h=l[0x0],J=R+h,t=I[J];return!t?(P['\x51\x66\x65\x51\x6e\x63']===undefined&&(P['\x51\x66\x65\x51\x6e\x63']=!![]),A=P['\x4e\x4b\x66\x57\x76\x54'](A,i),I[J]=A):A=t,A;},P(I,Z);}let tek=E('\x73\x6a\x30\x44',0x508)+ucapan()+'\x20'+conn['\x67\x65\x74\x4e\x61\x6d\x65'](m[E('\x35\x74\x61\x33',0x525)])+'\x2a\x0a\u256d\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u2727\x0a\u2534\x0a\u252c\x0a\u2502'+emot+'\x20\u300c\x20\x48\x61\x69\x20\x4b\x61\x6b\ud83d\udc4b\x20\u300d\x0a\u251c\u2756\x20\u300c\x20'+conn[E('\x30\x33\x5e\x36',0x519)](m[E('\x66\x76\x6b\x75',0x539)])+'\x20\u300d\x0a\u251c\u2756\x20\x20\x42\x61\x67\x61\x69\x6d\x61\x6e\x61\x20\x48\x61\x72\x69\x6d\x75\x3f\x20\ud83d\ude04\x0a\u251c\u2756\x20\x20\x54\x65\x72\x69\x6d\x61\x20\x4b\x61\x73\x69\x68\x20\x54\x65\x6c\x61\x68\x20\x4d\x65\x6e\x67\x67\x75\x6e\x61\x6b\x61\x6e\x20\x42\x6f\x74\x20\x4b\x61\x6d\x69\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x20\x20\u300c\x20\x2a\x55\x20\x73\x20\x65\x20\x72\x20\x20\x49\x20\x6e\x20\x66\x20\x6f\x20\u514b\x2a\x20\u300d\x0a\u2502'+emot+E('\x59\x43\x78\x32',0x4fc)+(usrs['\x72\x65\x67\x69\x73\x74\x65\x72\x65\x64']?usrs['\x6e\x61\x6d\x65']:conn[E('\x38\x31\x52\x68',0x549)](m[E('\x78\x67\x39\x76',0x50a)]))+'\x0a\u2502'+emot+'\x20\x2a\u1d1b\u1d00\u0262\x73\x3a\x2a\x20\x40'+m[E('\x61\x4e\x64\x24',0x516)][E('\x61\x59\x39\x29',0x500)]`@`[0x0]+'\x0a\u2502'+emot+E('\x30\x33\x5e\x36',0x515)+(m[E('\x67\x59\x56\x47',0x528)][E('\x64\x21\x62\x67',0x551)]`@`[0x0]==nomorown?E('\x36\x49\x68\x57',0x526):usrs[E('\x66\x76\x6b\x75',0x520)]>=0x1?E('\x25\x77\x23\x4e',0x51b):'\x46\x72\x65\x65\x20\x55\x73\x65\x72')+'\x0a\u2502'+emot+'\x20\x2a\u1d18\u0280\u1d07\u1d0d\u026a\u1d1c\u1d0d\x3a\x2a\x20'+(usrs['\x70\x72\x65\x6d\x69\x75\x6d\x54\x69\x6d\x65']>0x1?E('\x62\x49\x77\x52',0x54d):'\x4e\x6f')+E('\x56\x59\x55\x67',0x4ff)+emot+E('\x28\x43\x31\x6d',0x543)+moment['\x74\x7a'](E('\x28\x43\x31\x6d',0x52e))[E('\x30\x33\x5e\x36',0x531)]('\x48\x48')+'\x20\x48\x20\x20'+moment['\x74\x7a'](E('\x67\x53\x59\x28',0x52d))[E('\x71\x36\x34\x44',0x523)]('\x6d\x6d')+E('\x25\x77\x23\x4e',0x501)+moment['\x74\x7a'](E('\x62\x21\x6d\x58',0x51a))[E('\x4e\x4c\x28\x71',0x503)]('\x73\x73')+E('\x4a\x75\x58\x29',0x511)+emot+'\x20\x2a\u1d1c\x73\u1d07\u0280\x73\x3a\x2a\x20'+Object['\x6b\x65\x79\x73'](global['\x64\x62'][E('\x6b\x38\x50\x46',0x512)][E('\x51\x62\x32\x54',0x50f)])[E('\x75\x79\x74\x29',0x510)]+'\x0a\u2502'+emot+'\x20\x2a\u029f\u026a\u1d0d\u026a\u1d1b\x3a\x2a\x20'+usrs[E('\x68\x32\x35\x6a',0x545)]+'\x0a\u2502'+emot+'\x20\x2a\u029f\u1d07\u1d20\u1d07\u029f\x3a\x2a\x20'+usrs[E('\x53\x44\x79\x55',0x50b)]+'\x0a\u2502\x0a\u251c\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2508\u2500\u22c6\x0a\u2502\x20\x20\u300c\x20\x2a\x49\x20\x6e\x20\x66\x20\x6f\x20\x20\x20\x42\x20\x6f\x20\x74\x20\u6bd4\x2a\x20\u300d\x0a\u2502'+emot+E('\x67\x53\x59\x28',0x504)+mpt+'\x0a\u2502'+emot+E('\x35\x74\x61\x33',0x51f)+(conn[E('\x78\x67\x39\x76',0x522)]!=undefined?conn[E('\x45\x39\x70\x5b',0x544)][E('\x51\x53\x6e\x37',0x51c)]+'\x25\x20'+(conn[E('\x65\x38\x58\x24',0x52c)][E('\x25\x6f\x4f\x28',0x4fe)]?E('\x61\x4e\x64\x24',0x527):''):'\x74\x69\x64\x61\x6b\x20\x64\x69\x6b\x65\x74\x61\x68\x75\x69')+'\x0a\u2502'+emot+E('\x25\x77\x23\x4e',0x538)+_p+E('\x51\x53\x6e\x37',0x54b)+emot+'\x20\x2a'+Object[E('\x69\x40\x75\x31',0x51e)](global['\x64\x62']['\x64\x61\x74\x61']['\x75\x73\x65\x72\x73'])[E('\x68\x32\x35\x6a',0x533)]+E('\x32\x29\x35\x46',0x524)+emot+'\x20\x2a'+Object[E('\x30\x33\x5e\x36',0x52a)](global['\x64\x62'][E('\x51\x53\x6e\x37',0x552)][E('\x71\x36\x34\x44',0x50d)])[E('\x68\x32\x35\x6a',0x50c)](I=>I[0x1][E('\x46\x45\x75\x6e',0x50e)])[E('\x4e\x5a\x24\x67',0x52f)]+E('\x67\x53\x59\x28',0x517)+emot+'\x20\x2a'+Object[E('\x70\x5d\x73\x75',0x550)](global['\x64\x62'][E('\x61\x4e\x64\x24',0x534)]['\x75\x73\x65\x72\x73'])['\x66\x69\x6c\x74\x65\x72'](I=>I[0x1][E('\x59\x43\x78\x32',0x54c)])[E('\x25\x6f\x4f\x28',0x507)]+E('\x32\x29\x35\x46',0x532)+nameown+E('\x38\x31\x52\x68',0x53b)+nameown+E('\x72\x26\x33\x43',0x4fd)+emot+E('\x62\x21\x6d\x58',0x518)+usrs[E('\x75\x25\x64\x30',0x54f)]+(usrs['\x70\x72\x65\x6d\x69\x75\x6d\x54\x69\x6d\x65']>0x1?'\x0a\u2502'+emot+E('\x25\x6f\x4f\x28',0x52b)+emot+'\x20'+clockStringP(usrs[E('\x62\x49\x77\x52',0x53e)]-new Date()):'')+E('\x70\x5d\x73\x75',0x54e);function E(I,Z){return P(Z-0x35f,I);}const listMessage={'\x74\x65\x78\x74':tek,'\x66\x6f\x6f\x74\x65\x72':E('\x48\x62\x46\x29',0x548)+nameown+'\x0a\x0a'+botdate+'\x0a\x0a'+wm2,'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':await conn[E('\x62\x21\x6d\x58',0x502)](tek),'\x74\x69\x74\x6c\x65':'','\x62\x75\x74\x74\x6f\x6e\x54\x65\x78\x74':E('\x67\x53\x59\x28',0x4fb),'\x73\x65\x63\x74\x69\x6f\x6e\x73':sections};if(teks==E('\x51\x2a\x4a\x49',0x4fa))return conn[E('\x73\x6a\x30\x44',0x535)](m[E('\x61\x4e\x64\x24',0x53f)],listMessage,{'\x71\x75\x6f\x74\x65\x64':fakes,'\x6d\x65\x6e\x74\x69\x6f\x6e\x73':await conn[E('\x59\x43\x78\x32',0x540)](tek),'\x63\x6f\x6e\x74\x65\x78\x74\x49\x6e\x66\x6f':{'\x66\x6f\x72\x77\x61\x72\x64\x69\x6e\x67\x53\x63\x6f\x72\x65':0x1869f,'\x69\x73\x46\x6f\x72\x77\x61\x72\x64\x65\x64':!![]}});

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
    (function(I,Z){var l=I();function A(I,Z){return P(I-0x3d1,Z);}while(!![]){try{var R=-parseInt(A(0x48f,'\x59\x5b\x24\x65'))/0x1*(parseInt(A(0x487,'\x7a\x43\x25\x62'))/0x2)+parseInt(A(0x48a,'\x76\x4f\x41\x42'))/0x3+parseInt(A(0x47b,'\x5d\x53\x46\x34'))/0x4+-parseInt(A(0x479,'\x78\x24\x78\x34'))/0x5+-parseInt(A(0x476,'\x31\x54\x46\x70'))/0x6*(-parseInt(A(0x491,'\x44\x69\x5e\x6b'))/0x7)+-parseInt(A(0x488,'\x39\x61\x6a\x42'))/0x8*(parseInt(A(0x47f,'\x76\x77\x57\x26'))/0x9)+parseInt(A(0x47e,'\x57\x5e\x64\x42'))/0xa;if(R===Z)break;else l['push'](l['shift']());}catch(i){l['push'](l['shift']());}}}(G,0x4caf0));function E(I,Z){return P(I- -0x22b,Z);}function G(){var h=['\x34\x50\x41\x6c\x34\x50\x73\x6e\x34\x50\x45\x72\x34\x50\x73\x47\x34\x50\x77\x59\x34\x50\x45\x33\x34\x50\x77\x74\x34\x50\x2b\x59\x6c\x5a\x78\x57\x4e\x50\x63\x33\x38\x6c\x59\x59\x4a\x2f\x67\x6a\x47\x35\x78\x57\x50\x6c\x6b\x65\x38\x6a\x2b\x62\x55\x46\x63\x36\x47\x69\x42\x57\x4b\x79\x6f\x6d\x38\x6b\x6b\x62\x49\x46\x63\x2b\x4f\x42\x74\x64\x47\x53\x6b\x56\x34\x50\x32\x50\x34\x50\x45\x74\x34\x50\x45\x77\x34\x50\x45\x43\x34\x50\x41\x49\x34\x50\x73\x5a\x34\x50\x73\x2f\x34\x50\x41\x49','\x43\x43\x6b\x78\x57\x37\x35\x61\x72\x75\x4b\x46\x57\x37\x71\x31','\x57\x50\x30\x50\x57\x36\x66\x75\x62\x78\x42\x64\x4c\x61\x71','\x57\x51\x50\x47\x57\x34\x7a\x65\x57\x34\x52\x64\x4a\x4b\x78\x64\x4c\x73\x4e\x63\x4a\x43\x6f\x74\x57\x4f\x4f','\x57\x51\x69\x33\x57\x50\x34\x6d\x57\x37\x37\x64\x54\x38\x6b\x69\x57\x52\x76\x33\x6b\x43\x6b\x52\x57\x52\x48\x58\x57\x50\x79','\x74\x43\x6b\x53\x57\x36\x68\x63\x49\x43\x6f\x46\x57\x35\x47\x72\x57\x52\x69\x64\x57\x36\x56\x64\x52\x43\x6f\x6a','\x57\x4f\x69\x74\x6d\x53\x6b\x5a','\x57\x50\x71\x2f\x46\x6d\x6b\x48\x65\x43\x6b\x78\x72\x6d\x6b\x42\x62\x67\x43\x4b\x57\x34\x50\x6b','\x6e\x38\x6b\x76\x57\x34\x6e\x45\x57\x52\x4c\x69','\x57\x50\x57\x55\x57\x34\x44\x35\x57\x35\x2f\x63\x4a\x71','\x7a\x68\x37\x63\x56\x43\x6f\x57\x57\x35\x34\x31\x57\x37\x31\x4e\x62\x38\x6b\x58\x67\x61','\x41\x43\x6b\x6c\x64\x43\x6b\x54\x73\x38\x6f\x6b\x46\x43\x6f\x5a\x73\x31\x6c\x64\x50\x53\x6b\x50\x65\x32\x76\x58\x57\x34\x4b\x77\x57\x35\x58\x39\x77\x4c\x79\x6f\x67\x73\x6e\x6c\x6c\x4e\x70\x63\x50\x6d\x6b\x59\x6f\x43\x6f\x48\x57\x36\x4e\x63\x4b\x6d\x6b\x34\x57\x36\x5a\x64\x50\x53\x6b\x2b\x46\x6d\x6f\x58\x69\x38\x6f\x79\x45\x72\x70\x64\x51\x38\x6b\x44\x57\x37\x48\x6a\x44\x33\x65','\x61\x4c\x2f\x63\x52\x48\x37\x64\x56\x43\x6f\x39\x6b\x59\x52\x63\x54\x30\x61\x35\x6d\x53\x6f\x78','\x70\x4c\x64\x64\x56\x43\x6b\x44\x57\x51\x74\x64\x4b\x38\x6b\x4f\x57\x37\x71\x79\x57\x35\x54\x4b\x57\x34\x57\x66','\x57\x34\x31\x2f\x57\x52\x72\x65\x67\x38\x6b\x67','\x6f\x77\x61\x51\x57\x50\x78\x64\x52\x53\x6b\x73\x45\x71','\x57\x50\x68\x48\x54\x6c\x74\x48\x54\x52\x2f\x48\x54\x41\x5a\x48\x54\x4f\x53\x76\x34\x42\x77\x53\x59\x69\x42\x48\x54\x34\x33\x6b\x4a\x6d\x6b\x67\x34\x50\x2b\x67\x6e\x53\x49\x4f\x59\x4f\x34\x52','\x6e\x43\x6f\x70\x71\x43\x6f\x56\x64\x38\x6f\x67\x66\x43\x6b\x51\x45\x32\x68\x64\x47\x53\x6b\x4e','\x57\x34\x2f\x63\x48\x6d\x6f\x72\x57\x4f\x70\x63\x56\x38\x6b\x31\x57\x4f\x56\x63\x4e\x31\x74\x63\x50\x6d\x6b\x39\x68\x53\x6b\x43','\x67\x48\x46\x64\x49\x6d\x6b\x4b','\x71\x43\x6b\x42\x57\x51\x4a\x64\x51\x47\x7a\x45\x57\x4f\x48\x69\x77\x53\x6f\x36\x57\x52\x47','\x7a\x43\x6b\x73\x6a\x6d\x6f\x55\x79\x5a\x54\x4f\x66\x61\x76\x2b\x57\x34\x6d','\x7a\x78\x33\x64\x4f\x53\x6b\x61\x57\x51\x75\x36\x57\x36\x6a\x44','\x77\x6d\x6f\x33\x71\x43\x6b\x37\x44\x6d\x6b\x55\x57\x35\x54\x56\x45\x53\x6f\x36\x45\x43\x6f\x55\x57\x4f\x33\x63\x4d\x61','\x44\x71\x33\x63\x4f\x38\x6f\x6f\x42\x67\x48\x4b\x67\x6d\x6f\x37','\x76\x4a\x43\x6a\x66\x43\x6f\x6d\x57\x37\x30\x31\x57\x4f\x37\x64\x55\x77\x47\x6e\x76\x2b\x67\x33\x4c\x38\x49\x76\x44\x43\x6f\x72\x71\x61','\x57\x35\x37\x64\x50\x6d\x6f\x2f\x57\x37\x2f\x64\x54\x71','\x57\x51\x6e\x73\x75\x43\x6f\x46\x57\x34\x35\x47\x43\x6d\x6f\x48\x67\x43\x6f\x77\x57\x50\x53\x76\x57\x52\x46\x64\x49\x47','\x44\x71\x4e\x63\x50\x6d\x6b\x38\x6b\x49\x39\x50\x69\x43\x6f\x45\x6e\x4c\x34\x6d','\x79\x53\x6f\x78\x6b\x61\x5a\x63\x52\x72\x5a\x64\x50\x61'];G=function(){return h;};return G();}function P(I,Z){var l=G();return P=function(R,i){R=R-0xa3;var A=l[R];if(P['\x67\x48\x69\x55\x66\x58']===undefined){var E=function(a){var r='\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2b\x2f\x3d';var L='',j='';for(var g=0x0,u,W,N=0x0;W=a['\x63\x68\x61\x72\x41\x74'](N++);~W&&(u=g%0x4?u*0x40+W:W,g++%0x4)?L+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](0xff&u>>(-0x2*g&0x6)):0x0){W=r['\x69\x6e\x64\x65\x78\x4f\x66'](W);}for(var D=0x0,U=L['\x6c\x65\x6e\x67\x74\x68'];D<U;D++){j+='\x25'+('\x30\x30'+L['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](D)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](0x10))['\x73\x6c\x69\x63\x65'](-0x2);}return decodeURIComponent(j);};var m=function(a,r){var L=[],g=0x0,u,W='';a=E(a);var N;for(N=0x0;N<0x100;N++){L[N]=N;}for(N=0x0;N<0x100;N++){g=(g+L[N]+r['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](N%r['\x6c\x65\x6e\x67\x74\x68']))%0x100,u=L[N],L[N]=L[g],L[g]=u;}N=0x0,g=0x0;for(var D=0x0;D<a['\x6c\x65\x6e\x67\x74\x68'];D++){N=(N+0x1)%0x100,g=(g+L[N])%0x100,u=L[N],L[N]=L[g],L[g]=u,W+=String['\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65'](a['\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74'](D)^L[(L[N]+L[g])%0x100]);}return W;};P['\x66\x76\x57\x74\x55\x50']=m,I=arguments,P['\x67\x48\x69\x55\x66\x58']=!![];}var h=l[0x0],J=R+h,t=I[J];return!t?(P['\x71\x6e\x69\x76\x44\x45']===undefined&&(P['\x71\x6e\x69\x76\x44\x45']=!![]),A=P['\x66\x76\x57\x74\x55\x50'](A,i),I[J]=A):A=t,A;},P(I,Z);}conn[E(-0x173,'\x68\x6c\x41\x4a')](m['\x63\x68\x61\x74'],E(-0x16c,'\x29\x5e\x55\x4c'),E(-0x177,'\x34\x66\x5e\x49'),text[E(-0x182,'\x54\x73\x44\x4c')]()+(E(-0x185,'\x54\x30\x67\x40')+nameown+'\x0a')+botdate,E(-0x171,'\x42\x23\x6d\x6e'),E(-0x17b,'\x79\x51\x57\x50'),'\x4f\x77\x6e\x65\x72',E(-0x16e,'\x31\x62\x75\x52'),E(-0x187,'\x34\x66\x5e\x49'),E(-0x178,'\x40\x53\x35\x42'),m,{'\x63\x6f\x6e\x74\x65\x78\x74\x49\x6e\x66\x6f':{'\x65\x78\x74\x65\x72\x6e\x61\x6c\x41\x64\x52\x65\x70\x6c\x79':{'\x73\x68\x6f\x77\x41\x64\x41\x74\x74\x72\x69\x62\x75\x74\x69\x6f\x6e':!![],'\x6d\x65\x64\x69\x61\x55\x72\x6c':sig,'\x6d\x65\x64\x69\x61\x54\x79\x70\x65':0x2,'\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6f\x6e':sgc,'\x74\x69\x74\x6c\x65':E(-0x17c,'\x70\x33\x2a\x24'),'\x62\x6f\x64\x79':wm,'\x74\x68\x75\x6d\x62\x6e\x61\x69\x6c':await(await fetch(whmods))[E(-0x16f,'\x67\x30\x4c\x43')](),'\x73\x6f\x75\x72\x63\x65\x55\x72\x6c':sig}}});
	  
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
