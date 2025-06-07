

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

    console.log(doc.innerHTML); // デバッグ用

    const extracted=doc.querySelector(`[id="${chapterId}"]`);
    const pagelinks=doc.querySelector(`[id="pagelinks"]`);
    const pageh1=doc.querySelector(`[id="pageh1"]`);
    if (extracted) {
      document.getElementById("content").innerHTML=extracted.innerHTML;
      document.getElementById("links").innerHTML=pagelinks.innerHTML;
      document.getElementById("h1").innerHTML=pageh1.innerHTML;
    } else {
      console.error("指定の要素が見つかりませんでした");
    }
  } catch (err) {
    console.error("読み込みエラー:", err);
  }

}