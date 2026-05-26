// Run with: node fetch-book-data.js
// Fetches cover, page count, publish year, description from Google Books.
// Saves results to book-data.json.

const fs = require('fs');

const RAW = [
  {id:1,title:'The Good Earth',author:'Pearl S. Buck'},
  {id:2,title:'Memoirs of a Geisha',author:'Arthur Golden'},
  {id:3,title:'The Kite Runner',author:'Khaled Hosseini'},
  {id:4,title:'A Thousand Splendid Suns',author:'Khaled Hosseini'},
  {id:5,title:'You Like It Darker',author:'Stephen King'},
  {id:6,title:'Anne of Green Gables',author:'L.M. Montgomery'},
  {id:7,title:'In Order to Live',author:'Yeonmi Park'},
  {id:8,title:'The Storyteller',author:'Jodi Picoult'},
  {id:9,title:'The Seven Year Slip',author:'Ashley Poston'},
  {id:10,title:'The Things We Cannot Say',author:'Kelly Rimmer'},
  {id:11,title:'My Friends',author:'Fredrik Backman'},
  {id:12,title:'Quiet',author:'Susan Cain'},
  {id:13,title:'The Glass Girl',author:'Kathleen Glasgow'},
  {id:14,title:'The Dark Half',author:'Stephen King'},
  {id:15,title:'To Kill a Mockingbird',author:'Harper Lee'},
  {id:16,title:'The One',author:'John Marrs'},
  {id:17,title:'Born a Crime',author:'Trevor Noah'},
  {id:18,title:'All the Little Monsters',author:'David A. Robertson'},
  {id:19,title:'This Is Why We Lied',author:'Karin Slaughter'},
  {id:20,title:'Love and Gelato',author:'Jenna Evans Welch'},
  {id:21,title:'Pride and Prejudice',author:'Jane Austen'},
  {id:22,title:'One Golden Summer',author:'Carley Fortune'},
  {id:23,title:'Nobodys Girl',author:'Virginia Roberts Giuffre'},
  {id:24,title:'Looking for Jane',author:'Heather Marshall'},
  {id:25,title:'A Court of Thorns and Roses',author:'Sarah J. Maas'},
  {id:26,title:'A Court of Silver Flames',author:'Sarah J. Maas'},
  {id:27,title:'A Court of Wings and Ruin',author:'Sarah J. Maas'},
  {id:28,title:'Judge Stone',author:'James Patterson'},
  {id:29,title:'The Presidents Daughter',author:'James Patterson'},
  {id:30,title:'Project Hail Mary',author:'Andy Weir'},
  {id:31,title:'The Correspondent',author:'Virginia Evans'},
  {id:32,title:'Theo of Golden',author:'Allen Levi'},
  {id:33,title:'The Antique Hunters Murder at the Castle',author:'C.L. Miller'},
  {id:34,title:'The First Gentleman',author:'James Patterson'},
  {id:35,title:'Everyone in This Bank is a Thief',author:'Benjamin Stevenson'},
  {id:36,title:'The Calamity Club',author:'Kathryn Stockett'},
  {id:37,title:'A Gentleman in Moscow',author:'Amor Towles'},
  {id:38,title:'Educated',author:'Tara Westover'},
  {id:39,title:'Crying in H Mart',author:'Michelle Zauner'},
  {id:40,title:'A Short History of Nearly Everything',author:'Bill Bryson'},
  {id:41,title:'Ali',author:'Jonathan Eig'},
  {id:42,title:'The Third Victim',author:'Lisa Gardner'},
  {id:43,title:'Holly',author:'Stephen King'},
  {id:44,title:'Billy Summers',author:'Stephen King'},
  {id:45,title:'A Court of Mist and Fury',author:'Sarah J. Maas'},
  {id:46,title:'1984',author:'George Orwell'},
  {id:47,title:'Where the Crawdads Sing',author:'Delia Owens'},
  {id:48,title:'Friends Lovers and the Big Terrible Thing',author:'Matthew Perry'},
  {id:49,title:'Mistakes Were Made',author:'Lucy Score'},
  {id:50,title:'Our Perfect Storm',author:'Carley Fortune'},
  {id:51,title:'Live to Tell',author:'Lisa Gardner'},
  {id:52,title:'Lessons in Chemistry',author:'Bonnie Garmus'},
  {id:53,title:'Summer Island',author:'Kristin Hannah'},
  {id:54,title:'Catch-22',author:'Joseph Heller'},
  {id:55,title:'Brave New World',author:'Aldous Huxley'},
  {id:56,title:'On Writing',author:'Stephen King'},
  {id:57,title:'The Help',author:'Kathryn Stockett'},
  {id:58,title:'The Lucky One',author:'Nicholas Sparks'},
  {id:59,title:'Too Much and Never Enough',author:'Mary L. Trump'},
  {id:60,title:'The Violin Makers Secret',author:'Evie Woods'},
  {id:61,title:'Little Women',author:'Louisa May Alcott'},
  {id:62,title:'The Fourth Option',author:'Jack Carr'},
  {id:63,title:'All the Light We Cannot See',author:'Anthony Doerr'},
  {id:64,title:'Revenge of the Tipping Point',author:'Malcolm Gladwell'},
  {id:65,title:'The Book of Negroes',author:'Lawrence Hill'},
  {id:66,title:'Fairy Tale',author:'Stephen King'},
  {id:67,title:'Pachinko',author:'Min Jin Lee'},
  {id:68,title:'The Phantom of the Opera',author:'Gaston Leroux'},
  {id:69,title:'My Sisters Keeper',author:'Jodi Picoult'},
  {id:70,title:'Archers Voice',author:'Mia Sheridan'},
  {id:71,title:'The Girl from Berlin',author:'Ronald H. Balson'},
  {id:72,title:'Room',author:'Emma Donoghue'},
  {id:73,title:'Steve Jobs',author:'Walter Isaacson'},
  {id:74,title:'The Hundred-Year-Old Man Who Climbed Out the Window and Disappeared',author:'Jonas Jonasson'},
  {id:75,title:'Is Everyone Hanging Out Without Me',author:'Mindy Kaling'},
  {id:76,title:'A History of the World',author:'Andrew Marr'},
  {id:77,title:'Small Great Things',author:'Jodi Picoult'},
  {id:78,title:'The Tea Girl of Hummingbird Lane',author:'Lisa See'},
  {id:79,title:'Two by Two',author:'Nicholas Sparks'},
  {id:80,title:'The Color Purple',author:'Alice Walker'},
  {id:81,title:'Book of Lives',author:'Margaret Atwood'},
  {id:82,title:'The Testaments',author:'Margaret Atwood'},
  {id:83,title:'Beartown',author:'Fredrik Backman'},
  {id:84,title:'And Then There Were None',author:'Agatha Christie'},
  {id:85,title:'The Book of Lost Names',author:'Kristin Harmel'},
  {id:86,title:'I Know This Much Is True',author:'Wally Lamb'},
  {id:87,title:'Big Little Lies',author:'Liane Moriarty'},
  {id:88,title:'Im Glad My Mom Died',author:'Jennette McCurdy'},
  {id:89,title:'The Song of Achilles',author:'Madeline Miller'},
  {id:90,title:'Cherry Baby',author:'Rainbow Rowell'},
  {id:91,title:'The Blue Mountain',author:'Meir Shalev'},
  {id:92,title:'Felicias Favorites',author:'Danielle Steel'},
  {id:93,title:'The Glass Castle',author:'Jeannette Walls'},
  {id:94,title:'The Woman in the White Kimono',author:'Ana Johns'},
  {id:95,title:'The Henna Artist',author:'Alka Joshi'},
  {id:96,title:'11/22/63',author:'Stephen King'},
  {id:97,title:'Pet Sematary',author:'Stephen King'},
  {id:98,title:'One Long Weekend',author:'Shari Low'},
  {id:99,title:'Sold on a Monday',author:'Kristina McMorris'},
  {id:100,title:'Lamb',author:'Christopher Moore'},
  {id:101,title:'West with Giraffes',author:'Lynda Rutledge'},
  {id:102,title:'Persepolis',author:'Marjane Satrapi'},
  {id:103,title:'Lady Tans Circle of Women',author:'Lisa See'},
  {id:104,title:'Funny Boy',author:'Shyam Selvadurai'},
  {id:105,title:'The Handmaids Tale',author:'Margaret Atwood'},
  {id:106,title:'Us Against You',author:'Fredrik Backman'},
  {id:107,title:'My Grandmother Asked Me to Tell You Shes Sorry',author:'Fredrik Backman'}
];

const GOOGLE_BOOKS_API_KEY = 'AIzaSyB-ZkxxT9F88p3yQIlYVLJ9UgapFPlSPz8';
const DELAY = 300;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function trimDescription(text) {
  if (!text || text.length <= 500) return text || null;
  const cut = text.slice(0, 500);
  const lastDot = cut.lastIndexOf('.');
  return lastDot > 200 ? cut.slice(0, lastDot + 1) : cut.trim() + '…';
}

async function fetchGoogleBooks(book) {
  const last = book.author.split(' and ')[0].trim().split(' ').filter(Boolean).pop();
  const q    = encodeURIComponent(`intitle:${book.title} inauthor:${last}`);
  const url  = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1&fields=items(volumeInfo/imageLinks,volumeInfo/pageCount,volumeInfo/publishedDate,volumeInfo/description)&key=${GOOGLE_BOOKS_API_KEY}`;

  try {
    const res  = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error(`  [API error ${res.status}]`, err?.error?.message || '');
      return null;
    }
    const data = await res.json();
    const info = data.items?.[0]?.volumeInfo;
    if (!info) return null;

    const links = info.imageLinks || {};
    let coverUrl = links.extraLarge || links.large || links.medium || links.thumbnail || links.smallThumbnail || null;
    if (coverUrl) coverUrl = coverUrl.replace('http://', 'https://').replace(/zoom=\d/, 'zoom=3');

    return {
      coverUrl,
      pageCount:   info.pageCount   || 0,
      publishYear: info.publishedDate ? info.publishedDate.slice(0, 4) : null,
      description: trimDescription(info.description || null),
    };
  } catch (e) {
    console.error(`  [fetch error]`, e.message);
    return null;
  }
}

async function main() {
  console.log(`Fetching data for ${RAW.length} books...\n`);
  const results = [];

  for (let i = 0; i < RAW.length; i++) {
    const book = RAW[i];
    process.stdout.write(`[${String(i + 1).padStart(3)}/${RAW.length}] ${book.title.slice(0, 45).padEnd(45)} `);

    const bookData = await fetchGoogleBooks(book);

    const result = {
      id:          book.id,
      coverUrl:    bookData?.coverUrl    || null,
      pageCount:   bookData?.pageCount   || 0,
      publishYear: bookData?.publishYear || null,
      description: bookData?.description || null,
    };
    results.push(result);

    const flags = [
      result.coverUrl    ? 'cover' : '     ',
      result.pageCount   ? 'pages' : '     ',
      result.publishYear ? 'year'  : '    ',
      result.description ? 'desc'  : '    ',
    ].join(' ');
    console.log(flags);

    if (i < RAW.length - 1) await sleep(DELAY);
  }

  fs.writeFileSync('book-data.json', JSON.stringify(results, null, 2));

  const s = {
    cover: results.filter(r => r.coverUrl).length,
    pages: results.filter(r => r.pageCount).length,
    year:  results.filter(r => r.publishYear).length,
    desc:  results.filter(r => r.description).length,
  };

  console.log(`\n── Summary ─────────────────────────`);
  console.log(`  Covers found:        ${s.cover}/${RAW.length}`);
  console.log(`  Page counts found:   ${s.pages}/${RAW.length}`);
  console.log(`  Publish years found: ${s.year}/${RAW.length}`);
  console.log(`  Descriptions found:  ${s.desc}/${RAW.length}`);
  console.log(`\nSaved to book-data.json`);
}

main().catch(console.error);
