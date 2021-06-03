// Load a book from disk
function loadBook(filename, displayName) {
  let currentBook = "";
  let url = "/files/books/" + filename;

  // Reset our UI
  document.querySelector("#fileName").innerHTML = displayName;
  document.querySelector("#searchStat").innerHTML = "";
  document.querySelector("#keyword").value = "";

  //   Create a server request to load our book
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  // every time something change about this request the function will be called
  xhr.onreadystatechange = function () {
    // when the http request is ready populate the variable with the response
    if (xhr.readyState == 4 && xhr.status == 200) {
      currentBook = xhr.responseText;

      getDocStats(currentBook);

      /* replace all \r\n or just \r or just \n with <br>
      \r - all returns \n all cariage /g look at the entire document for those and channge globaly with <br> */
      currentBook = currentBook.replace(/(\r\n|\r|\n)/g, "<br>");

      document.querySelector("#fileContent").innerHTML = currentBook;

      // every time when load a document i want to scroll to the top
      document.querySelector("#fileContent").scrollTop = 0;

      //   console.log(currentBook);
    }
  };
}

//get the stats for the book
function getDocStats(fileContent) {
  let docLength = document.querySelector("#docLength");
  let wordCount = document.querySelector("#wordCount");
  let charCount = document.querySelector("#charCount");

  let text = fileContent
    .toLowerCase()
    .replace(/(<br\/>)/g, "")
    .replace(/[\\!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~\-\"\“\”\—]/g, " ")
    .replace(/\s{2,}/g, " ");
  console.log(text);

  let wordArray = text.match(/\b\S+\b/g);
  //   console.log("Word array :", wordArray);
  let wordDictionary = {};

  let uncommonWords = [];
  uncommonWords = filterStopWords(wordArray);

  for (let word in uncommonWords) {
    // wordValue store the actual word
    let wordValue = uncommonWords[word];
    if (wordDictionary[wordValue] > 0) {
      wordDictionary[wordValue] += 1;
    } else {
      wordDictionary[wordValue] = 1;
    }
  }
  console.log(wordArray);
  console.log(wordDictionary);
  //   console.log(wordDictionary);
  let wordList = sortProperties(wordDictionary);
  let top5Words = wordList.slice(0, 6);
  let least5Words = wordList.slice(-6, wordList.length);

  //Write the values to the page
  ULTemplate(top5Words, document.querySelector("#mostUsed"));
  ULTemplate(least5Words, document.querySelector("#leastUsed"));

  docLength.innerText = "Document Length: " + text.length;
  wordCount.innerText = "Word Count: " + wordArray.length;
}

function ULTemplate(items, element) {
  let rowTemplate = document.querySelector("#template-ul-items");
  let templateHTML = rowTemplate.innerHTML;
  let resultsHTML = "";
  for (let i = 0; i < items.length - 1; i++) {
    // the function will take the top5Words and least5Words and loop withing them
    // the {{val}} will be replaced with ["harry",1230].[0] -> harry, ["harry",1230][1] -> 1230
    resultsHTML += templateHTML.replace(
      "{{val}}",
      items[i][0] + " : " + items[i][1] + " time(s)"
    );
  }

  element.innerHTML = resultsHTML;
}

function sortProperties(obj) {
  //convert the object to an array
  let returnArray = Object.entries(obj);
  //   console.log(returnArray); -> output an array with array elements that holds 2 values like this : [["alice",120],["wonder",39],...]
  returnArray.sort(function (first, second) {
    return second[1] - first[1];
  });
  //   console.log(returnArray);
  return returnArray;
}

//filter out common words
function filterStopWords(wordArray) {
  let commonWords = getStopWords();
  let commonObj = {}; // the words that we avoid
  let uncomonArr = []; // the words that we are looking for

  // create the object
  for (let i = 0; i < commonWords.length; i++) {
    commonObj[commonWords[i].trim()] = true;
  }

  for (let i = 0; i < wordArray.length; i++) {
    word = wordArray[i].trim().toLowerCase();
    if (!commonObj[word]) {
      uncomonArr.push(word);
    }
  }

  return uncomonArr;
}

//highlight the words in search
function performMark() {
  let keyword = document.querySelector("#keyword").value;
  let display = document.querySelector("#fileContent");

  let newContent = "";

  //find all the currently marked items
  let spans = document.querySelectorAll("mark");
  //<mark></mark>

  for (let i = 0; i < spans.length; i++) {
    //transform <mark>Word</mark> into Word - unmark everything
    spans[i].outerHTML = spans[i].innerHTML;
  }

  //get the word from the search global and non-case-sensitive
  let regExp = new RegExp(keyword, "gi");
  //$& insert the matched substring - replace property
  let replaceText = "<mark class='markMe'>$&</mark>";
  let bookContent = display.innerHTML;

  newContent = bookContent.replace(regExp, replaceText);
  display.innerHTML = newContent;

  let count = document.querySelectorAll("mark").length;
  document.querySelector("#searchStat").innerHTML =
    "Found : " + count + " matches";

  //scroll to the first element that is founded
  if (count > 0) {
    let element = document.querySelector(".markMe");
    element.scrollIntoView();
  }
}

function getStopWords() {
  return [
    "a",
    "about",
    "above",
    "after",
    "again",
    "against",
    "all",
    "am",
    "an",
    "and",
    "any",
    "are",
    "aren't",
    "as",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    "between",
    "both",
    "but",
    "by",
    "can't",
    "cannot",
    "could",
    "couldn't",
    "did",
    "didn't",
    "do",
    "does",
    "doesn't",
    "doing",
    "don't",
    "down",
    "during",
    "each",
    "few",
    "for",
    "from",
    "further",
    "had",
    "hadn't",
    "has",
    "hasn't",
    "have",
    "haven't",
    "having",
    "he",
    "he'd",
    "he'll",
    "he's",
    "her",
    "here",
    "here's",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "how's",
    "i",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "if",
    "in",
    "into",
    "is",
    "isn't",
    "it",
    "it's",
    "its",
    "itself",
    "let's",
    "me",
    "more",
    "most",
    "mustn't",
    "my",
    "myself",
    "no",
    "nor",
    "not",
    "of",
    "off",
    "on",
    "once",
    "only",
    "or",
    "other",
    "ought",
    "our",
    "ours",
    "ourselves",
    "out",
    "over",
    "own",
    "same",
    "shan't",
    "she",
    "she'd",
    "she'll",
    "she's",
    "should",
    "shouldn't",
    "so",
    "some",
    "such",
    "than",
    "that",
    "that's",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "there's",
    "these",
    "they",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "until",
    "up",
    "very",
    "was",
    "wasn't",
    "we",
    "we'd",
    "we'll",
    "we're",
    "we've",
    "were",
    "weren't",
    "what",
    "what's",
    "when",
    "when's",
    "where",
    "where's",
    "which",
    "while",
    "who",
    "who's",
    "whom",
    "why",
    "why's",
    "with",
    "won't",
    "would",
    "wouldn't",
    "you",
    "you'd",
    "you'll",
    "you're",
    "you've",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "said",
    "will",
    "now",
  ];
}
