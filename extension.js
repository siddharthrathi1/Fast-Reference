const vscode = require("vscode");
const Parser = require("rss-parser");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "fast-reference.FastReference",
    async function () {
      try {
        const smashingFeed = await fetchFeed("https://www.smashingmagazine.com/feed/"); 
        const cssTricksFeed = await fetchFeed("https://css-tricks.com/feed/");
        const alistapart = await fetchFeed("https://alistapart.com/main/feed/");
        const hacksMozilla = await fetchFeed("https://hacks.mozilla.org/feed/");
        const webDevSimplified = await fetchFeed("https://blog.webdevsimplified.com/rss.xml");
        const codrops= await fetchFeed("https://tympanus.net/codrops/feed/");
        const addyosmani= await fetchFeed("https://addyosmani.com/rss.xml");
        const reactjs= await fetchFeed("https://legacy.reactjs.org/feed.xml");
        const davidwalsh= await fetchFeed("https://davidwalsh.name/feed");
        const csswizardry= await fetchFeed("https://davidwalsh.name/feed");
        const webweekly= await fetchFeed("https://web-design-weekly.com/feed/");
        const cssweekly= await fetchFeed("https://css-weekly.com/feed/");
        const devto= await fetchFeed("https://dev.to/feed");
        const jssweekly= await fetchFeed("https://cprss.s3.amazonaws.com/javascriptweekly.com.xml");
        const two47= await fetchFeed("https://247webdevs.blogspot.com/rss.xml");
       
        const stackoverflow= await fetchFeed("https://stackoverflow.blog/feed/");
        const freecodecamp= await fetchFeed("https://www.freecodecamp.org/news/rss");

        const articles = [...smashingFeed, ...cssTricksFeed, ...alistapart, ...hacksMozilla, ...webDevSimplified, ...codrops, ...addyosmani, ...reactjs, ...davidwalsh, ...csswizardry, ...webweekly, ...cssweekly, ...jssweekly,...two47, ...freecodecamp, ...stackoverflow,...devto].map((item) => ({
          label: item.title,
          detail: item.contentSnippet,
          link: item.link,
        }));

        const selectedArticle = await vscode.window.showQuickPick(articles, {
          matchOnDetail: true,
        });

        if (selectedArticle) {
          vscode.env.openExternal(selectedArticle.link);
        }
      } catch (error) {
        vscode.window.showErrorMessage("Failed to fetch articles: " + error.message);
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function fetchFeed(feedUrl) {
  const parser = new Parser();
  const feed = await parser.parseURL(feedUrl);
  return feed.items;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
