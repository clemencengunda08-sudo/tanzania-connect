async function testFeeds() {
  const feeds = [
    { name: 'Daily News', url: 'https://dailynews.co.tz/feed/' },
    { name: 'The Citizen', url: 'https://www.thecitizen.co.tz/rss' },
    { name: 'IPP Media', url: 'https://www.ippmedia.com/feed' },
  ];

  for (const f of feeds) {
    try {
      console.log(`Fetching ${f.name} (${f.url})...`);
      const res = await fetch(f.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        signal: AbortSignal.timeout(10000),
      });
      console.log(`${f.name} Status: ${res.status}`);
      const text = await res.text();
      console.log(`${f.name} length: ${text.length}, has item: ${text.includes('<item>') || text.includes('<item ')}`);
      
      const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
      let m;
      let count = 0;
      while ((m = itemRegex.exec(text)) !== null && count < 3) {
        count++;
        const block = m[1];
        const titleMatch = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        const linkMatch = block.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i) || block.match(/<guid[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/guid>/i);
        console.log(`  [${count}] title: ${titleMatch ? titleMatch[1].trim() : 'NONE'}`);
        console.log(`      link: ${linkMatch ? linkMatch[1].trim() : 'NONE'}`);
      }
    } catch (err) {
      console.error(`Error fetching ${f.name}:`, err.message);
    }
  }
}

testFeeds();
