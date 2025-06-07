

//ページとチャプターの初期値を調べる
const params = new URLSearchParams(window.location.search);

const openFile = params.get('p');
const openChapter = params.get('c');

//-URLに、XXX.html?p=(ページ番号)&c=(チャプター番号)と記載する-
if(openFile && chapter){
  chapter(openFile,openChapter);
}

async function chapter(chapterFile,chapterId){
  try {
    const res = await fetch(`chapters/${chapterFile}.html`);
    const htmlText = await res.text();

    const parser=new DOMParser();
    const doc=parser.parseFromString(htmlText,'text/html');

    const extracted=doc.querySelector(`[id="${chapterId}"]`);
    if (extracted) {
      document.getElementById("content").innerHTML=extracted.innerHTML;
    } else {
      console.error("指定の要素が見つかりませんでした");
    }
  } catch (err) {
    console.error("読み込みエラー:", err);
  }

}

async function pageOpen(chapterFile,chapterId){
  try {
    const res = await fetch(`chapters/${chapterFile}.html`);
    const htmlText = await res.text();

    const parser=new DOMParser();
    const doc=parser.parseFromString(htmlText,'text/html');

    const extracted=doc.querySelector(`[id="${chapterId}"]`);
    const links=doc.querySelector(`[id="links"]`)
    const h1=doc.querySelector(`[id="h1"]`)
    if (extracted) {
      document.getElementById("content").innerHTML=extracted.innerHTML;
      document.getElementById("links").innerHTML=links.innerHTML;
      document.getElementById("h1").innerHTML=h1.innerHTML;
    } else {
      console.error("指定の要素が見つかりませんでした");
      console.error(extracted,links,h1);
    }
  } catch (err) {
    console.error("読み込みエラー:", err);
  }

}