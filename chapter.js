const params = new URLSearchParams(window.location.search);
console.log(params);
const openChapter = params.get('chapter');
console.log(openChapter);
if(chapter){
  chapter(openChapter);
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
