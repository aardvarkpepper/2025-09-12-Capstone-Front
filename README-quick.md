## NOTE TO SELF

Authentication/authorization should be more directly reflected in routes, perhaps.  After all, what happens if someone doesn't use the front end to connect to the back end (types into browser directly)?

## BACKEND

Authentication and authorization on users and their operations.

CRUD:  Users:
Users have LINKS.  Here, they can edit commentary on their LINKS to OOL and Calculator.  Later these LINKS can lead to IndexedDB, for now only MongoDB.

CRUD:  Ruleset:
OOL here is prepopulated, with commentary. (Attacker OOL, defender OOL).  Ruleset, type (attacker/defender), area (sea/land/amphib, bombard), 

Calculator functions come under ruleset (as they're related to OOL).

## FRONTEND

Auto-adjust based on units present what sort of 'area' it is, error message if illegal ruleset (e.g. bomber defending at sea).
Preset buttons for previous calculations (these are NAMED LINKS)

law requires notifying user if tracking data

localstorage safe from csrf but not xss (worse - packages)

## DATA

Data as a service (!).  When the user sends a request for data, it's parsed on their end into a single argument that sums up the parameters.  This argument corresponds to a specific calculator setting in the backend; the calculator setting 'count' is incremented by one on each request.

Calculation data is stored in arrays in arrays.  For example, were I to request calculation on 8 infantry 1 artillery 3 tanks 1 bomber, that would be read as seven 1's, two 2's, three 3's, and one 4, that is, array[7][2][3][1].

For reusable code and flexibility, arrays of arrays should not inherently tie array reference order to to-hit.  For example, [7] is the first array in the previous paragraph, requiring 1 or lower on d6 to hit.  (There is no use in trying to get 0 on d6, and 6 on d6 is autosuccess, so perhaps there might be a fifth array reference).  At any rate, perhaps I would want to have 'succeeds on combined roll of 4 or less on a roll of 3d6' in the first array, things like that.

## FLOW

..useRef

Access website, see calculator feature, show functionality.
Anyone can create an OOL.  ('Finalize' button) - inf, art, tank, fighter, bomber (aa not included).
Only premium users and admins can save an OOL to database.  When they login, extant OOLs in state are sent.

Remember 'clan' implementation

In state are RULESET, (useMemo?) OOLs OBJECT, CALCULATOR INPUTS (including att and def OOL and unit comp att and def), USER, USER LINKS (including to OOL).  Remember useMemo, use...the thing that doesn't change functions.

RULESET is an object with id number, and an object with common names.  An ID number is used so implementation doesn't break when different languages are used (also, easier reference).  ID is used to filter results from database (or is it?).  Default is 1942 Second Edition, value cannot be null.  This is NOT passed to the database (in future would be)

USER is an object with id number, username, email, password, isVerified (email verified), accessToken, avatar, blurb, rank, location, theme, language, notificationSettings.  Remember that 'accessToken' should be stored in localStorage;  HERE, it is only id, user, email, role, password.

OOLs is an object of objects or class instances.  _id, ruleset (default and fixed as 1942Second), datefields, text object (keys: langs, values: objects); that text object cotnains commonName and description.  HERE it is only id, commonName object (use commonName.en), description object (use commonName.en), ool (String).  The problem is the OOL is not inherently linked to being a String; really it's an enum dependent on Ruleset, but that's for later implementation.

USER LINKS is an OBJECT with _id, OBJECT_ID of user, key: OOL, value: array of [OBJECT_ID of OOL, nickname].  If other personal data needs to be stored, we pop it in the same array.  (Note - credit card and other sensitive data wouldn't be stored, ONLY relatively nonsensitive data).  HERE it is id, user_id, ool_id, nickname

CALCULATOR INPUTS are att OOL, def OOL, att comp, def comp.  These are NOT passed to the database.



When the premium user / admin logs in, their USER DATA is put in state and rendered.  Their USER LINK including link-OOL list is also retrieved and put in state.  USER LINK is an object with _id, userID (OBJECTID), array of objects with (key: ruleset, value: object of sublinks), the current rulestate in state is checked and the appropriate sublinks is retrieved.  In this case, 19422e 

The currently selected ruleset in STATE is  The OOL_ids are used in a fetch request to retrieve OOLs.  (The ruleset does not matter?)

Inputs:  Inf, art, tank, fighter, bomber for attacker and defender
OOL:  Text input (OOL), text input (notes)

## ROUTES

Any can use calculator basic functions.

Admin can CRUD all of users, ools, userlinks.
Subs can UD their account and userlinks, and can read all OOLs.  Can also Create OOLs without control over text fields (default).
Users can R their account.  (Nothing).

/ (calculator) att comp, def comp, att OOL, def OOL are all in state, and modifiable.

List has delete / modify for each.
admin/users GET, ok
<!-- admin/users POST (register user) -->
admin/users/:id PUT, DELETE (note:  replicant) ok, ok
admin/ools GET (replicant), POST (unique, unrestricted) ok, ok
admin/ools/:id PUT, DELETE ok, ok
admin/userlinks GET (all) (creation is a user thing, but allow POST anyways), POST; ok, ok, 
admin/userlinks/:id PUT, DELETE (in case administrators need to do something) ok, ok

<!-- subs/register POST (register) -->
<!-- subs/login POST (login) -->
subs/users/:id PUT DELETE (they can edit or delete themselves) ok, ok
subs/ools GET ALL (not replicant; getting by user ID), POST (unique, RESTRICTED access) ok, ok

Remember - the code needs to be consolidated and function'd out.  Instead of writing one function bunches of times, write once and reference a bunch of times.

It's a little odd because they can POST limited OOLs . . . but they can't ACCESS those OOLs.  Oh well.

subs/userlinks GET (only for the sub), POST
subs/userlinks/:id PUT, DELETE

as admin and subs both require JWT, register and login must not go through those routes (unless JWT req deactivated)
/register
/login

So

register POST (register)
login POST (login)

USER:  username, email, password(5), role(user, sub, admin)


OOL: commonName (object, do operations on '.en'), description (object, do operations on '.en'), ool (String)
USERLINK: user_id, ool_id, nickname (user-specified)

##

## LATER

Make user standalone, think on how subs are essentially facilitating and paying into data community sharing - where's the value for them?  Why should the user use the product independently?  How can the app limit cost?

https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable



## Features

Do good README.md.  Set aside time for this.  Include project creation instructions from bash.
Authentication and authorization; bcrypt, jsonwebtoken.  OAuth as time allows.
Generally things have create/modify date.

Generally, things have a 'true id' that reflect unique characteristics (e.g. a OOL profile ID reflects the fact it's for 1942 Second Edition, maximizing utility expressed in net IPC expectation OR utility expressed by custom parameters).

OOL profiles and OOLs are properties of a ruleset.  They are linked to that ruleset.  (INDEX:  RULESET).  Likewise, map data, unit data, ruleset data, are linked to the ruleset.

A user's display options are properties of the user, not the ruleset.  They are linked to the user.  Each display item is linked to a property of the ruleset object.

That is, say ruleset for a game like 1942 Second Edition has an OOL profile and OOLs,  The user wants to display their favorite OOL profiles and OOLs in some order.  Some data is property of the ruleset - e.g. the absolute ID 7hjK2 (for example) might have a common name of 'German Tank Rush' (if in English).  However, the player might display this as 'ubertankstorm' in index position 2.

All data eventually receives similar treatment.  Note this could be pretty heavy on data operations.  (e.g. suppose a user wants to look for articles by their favorite player, or defensive profiles by players in a defined group or clan, or whatever.  Then there has to be handling for players belonging in multiple groups, etc. etc. )

Backend:
User: displayname, password, create/modify date.

ACTIONABLE ADVICE:  Regardless, concentrate on actionable advice.  Simple, to the point.  How can the assessment help?  Data visualizations?

Click a button to switch between 'commmon name' and 'username'.  Remember common name may be different based on language.

OOL profile:  Commentary attached.  Contains different order of losses.  Generated unique ID.  Username.  Common name.

OOL:  Commentary attached.  Generated unique ID.  Username.  Common name.

A 'calculator' file has:  An offensive OOL profile and a separate defensive OOL profile (each account for custom orders).  Initial composition attackers, initial composition defenders.  A URL that includes those parameters.

any number of followup 'waves'.  Calculator itself has a generated unique ID

Later, think about languages - we don't really need to be sending data for 12 languages from server to central.  Rather, we have front end specific to languages, yes?  Or we change the database so the data sent is only of the requisite language (how much more back and forth will this cost?). Well, Mongoose has projections so only the needed lagnuage need be sent.


## Storage

Undifferentiated arrays are classified by five numbers, the first corresponding with the number of '1' or less to 'succeed' rolls on a d6, ... fifth ... '5' or less.  (0 or less is always failure, 6 or less is always success, no need to 'roll').




/**
 * Calculates the binomial coefficient (n choose k).
 * @param {number} n - The number of items.
 * @param {number} k - The number of items to choose.
 * @returns {number} The binomial coefficient.
 */
function combinations(n, k) {
  if (k < 0 || k > n) {
    return 0;
  }
  if (k === 0 || k === n) {
    return 1;
  }
  if (k > n / 2) {
    k = n - k;
  }
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = result * (n - i + 1) / i;
  }
  return result;
}

/**
 * Calculates the binomial probability of getting exactly k successes in n trials.
 * @param {number} n - The number of trials.
 * @param {number} k - The number of successes.
 * @param {number} p - The probability of success on a single trial.
 * @returns {number} The binomial probability.
 */
function binomialProbability(n, k, p) {
  return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/**
 * Calculates the combined probability distribution for two independent binomial events.
 * @param {number} n1 - Number of trials for Event 1.
 * @param {number} p1 - Probability of success for Event 1.
 * @param {number} n2 - Number of trials for Event 2.
 * @param {number} p2 - Probability of success for Event 2.
 * @returns {object} An object mapping total successes to their probability.
 */
function calculateCombinedProbabilities(n1, p1, n2, p2) {
  const probDist1 = [];
  for (let k = 0; k <= n1; k++) {
    probDist1.push(binomialProbability(n1, k, p1));
  }

  const probDist2 = [];
  for (let k = 0; k <= n2; k++) {
    probDist2.push(binomialProbability(n2, k, p2));
  }

  const combinedProbabilities = new Array(n1 + n2 + 1).fill(0);

  // Perform the convolution
  for (let i = 0; i < probDist1.length; i++) {
    for (let j = 0; j < probDist2.length; j++) {
      const totalSuccesses = i + j;
      combinedProbabilities[totalSuccesses] += probDist1[i] * probDist2[j];
    }
  }

  const result = {};
  for (let k = 0; k < combinedProbabilities.length; k++) {
    result[k] = combinedProbabilities[k];
  }

  return result;
}

// Example usage with your specific problem:
const n1 = 4;
const p1 = 1 / 6;
const n2 = 2;
const p2 = 2 / 6;

const finalDistribution = calculateCombinedProbabilities(n1, p1, n2, p2);

console.log("Combined Probability Distribution:");
for (const [successes, probability] of Object.entries(finalDistribution)) {
  console.log(`Total Successes: ${successes}, Probability: ${probability.toFixed(6)}`);
}





Questions by country / level of expertise

## United of Soviet Socialist Republics

## Germany

## United Kingdom

## Japan

## United States of America

What is the 'correct' OOL against R1 12 W Rus / 9 Cauc ? How is this visualized?
Should USSR submarine submerge at sz7?  What if it does or does not?  What are the risks?
Should US submarine submerge at Hawaii Islands?
What is the expected outcome of R1 4 inf 2 tank buy, how does it play out against Karelia?  Ukraine?
What order should R do R1's 12 W Rus 9 Ukr in and why?


## Later

'Generated unique ID' is based on some sort of character hash, based on "?inf=13&art=7 is basically compressible to i=13&a=7, except even that is compressible to an equivalent, perhaps 'J2' - if all possible combinations are used, if numbers are expressed in base 62 (uppercase, lowercase, base 10), etc.

Compression and decompression for URL.  Something like instead of ? and &, instead all data can be fed into a single string where first character is unit type (allows for up to 62 unit types for upper and lowercase and numbers), and subsequent characters are unit count.  Numbers are represented by something like base 31, as half of the inputs are 'string enders' - compare this against, say, base 52?  Have to compare actual data inputs, but I suspect base 31 will work just fine, as unit counts shouldn't be that high.  So like 'ig' might be '16 infantry', as the 'g' means '6' and also 'end the substring'. Look into special characters, and SQL injection attacks - explicitly, some special characters should be excluded for safety, so can't be used in the base count.

ALTERNATELY - convert to binary then compress?

Strategy:  A writeup with a node tree / flowchart of if-then assessments.  What are the areas that need to be watched? If ABCD are true then do X; if ABDE are true do Y instead - what the overall 'best chance' is.  What are the key states, how are they assessed, how do they flow from one into another?

Area / Tactics Node:  A writeup with a node tree / flowchart of if-then assessment.  What are the territories that need to be watched?  How do those define the position?  What are useful compositions?

Game:  Contains version based on, description, release date, original publisher.  Contains map data and rules (algorithmic) and html files of 'rules'.  Contains the compression/decompression algorithm unique to that game.  Each of the previous referenced fields is its own data.

## G ON INDEXED (check independently)

Using IndexedDB in a React app can be a great way to handle client-side data, especially for offline-first applications. However, you may encounter several issues, including browser compatibility quirks, permission-related problems, and general access difficulties.


Browser Compatibility and Quirks
While IndexedDB is widely supported across modern browsers, their implementations aren't identical. This can lead to unexpected behavior.

Safari's Intelligent Tracking Prevention (ITP): Safari is known for its aggressive privacy features. Its ITP policy can automatically delete IndexedDB data after seven days of inactivity if the user doesn't interact with the site, treating the data as a potential tracking mechanism.

Performance Differences: IndexedDB is a non-blocking, asynchronous API. However, the performance of transactions can vary between browsers, and a large number of individual transactions can be slow. It's often more efficient to batch operations into a single transaction.


Version and Schema Upgrades: Handling database versioning and schema changes can be a source of errors. If a user's browser has an older version of your database, you must provide a proper onupgradeneeded function to handle migrations. Failure to do so can result in errors when trying to access object stores that don't exist in the old version.


Bugs: Historically, various browsers have had specific bugs with IndexedDB, from data corruption to operations hanging without progress or error messages. While most are fixed in modern versions, it's still good to be aware that some edge cases may exist.

Permissions and Quotas
Although IndexedDB doesn't typically require a user prompt for permission, certain scenarios can trigger issues.

Storage Quotas: Each browser has its own limits on how much data a website can store, and this is often a percentage of the user's free disk space. If you exceed this quota, the browser will throw a QuotaExceededError. It's crucial to handle this error gracefully.


Private Browsing Mode: In private or incognito browsing, IndexedDB storage is usually temporary and will be cleared when the session ends. This can lead to a loss of user data if your application relies on persistent storage in all modes.

Data Eviction: If a user's device is low on disk space, the browser may evict IndexedDB data to free up resources, particularly if the data is considered "best-effort" storage. You can request "persistent" storage to reduce the chance of eviction, but the browser may still refuse if space is critically low.


User Clearing Data: A user can always manually clear their browser's local storage, including IndexedDB, through the browser settings. Your application should be able to handle this without crashing and should be designed to re-initialize the database and restore any necessary data.

Difficulties in Accessing and Debugging
Debugging IndexedDB can be challenging, especially when dealing with asynchronous operations and transactions.

Asynchronous Nature: IndexedDB is an asynchronous API, which can lead to race conditions if not handled carefully. Using a library like idb (a lightweight wrapper that promises the IndexedDB API) can simplify the code and prevent common errors.

Transactions: All database operations must occur within a transaction. Transactions have a specific lifespan and scope, and if you try to perform an operation outside a transaction or on an inactive one, it will fail.

Debugging Tools: While browser developer tools allow you to inspect and manually clear IndexedDB data, debugging complex transaction flows and errors can be difficult. You may need to rely heavily on logging and error handling to pinpoint issues.

Same-Origin Policy: IndexedDB is governed by the same-origin policy, meaning data stored by one domain cannot be accessed by another. This is a security feature, but it means you can't share data between, for example, app.example.com and another.example.com via IndexedDB.


Sources
https://www.telerik.com/blogs/beginners-guide-indexeddb#:~:text=IndexedDB%20is%20supported%20by%20all,format%2C%20similar%20to%20a%20database.

https://gist.github.com/pesterhazy/4de96193af89a6dd5ce682ce2adff49a

https://medium.com/@MakeComputerScienceGreatAgain/unleashing-indexeddb-the-powerhouse-of-browser-storage-part-1-introduction-0f3de12264f0

https://gist.github.com/pesterhazy/4de96193af89a6dd5ce682ce2adff49a

https://dev.to/tene/localstorage-vs-indexeddb-javascript-guide-storage-limits-best-practices-fl5

https://rxdb.info/slow-indexeddb.html#:~:text=It%20is%20quite%20fast%20and,one%20transaction%20per%20document%20write.

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#:~:text=One%20of%20the%20common%20possible,handled%20by%20the%20error%20handler.

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#:~:text=If%20the%20database%20does%20exist,updated%20schema%20in%20its%20handler.

https://gist.github.com/pesterhazy/4de96193af89a6dd5ce682ce2adff49a

https://rxdb.info/articles/indexeddb-max-storage-limit.html#:~:text=Chrome%20(and%20Chromium%2Dbased%20browsers,caps%2C%20especially%20on%20iOS%20devices.

https://web.dev/articles/storage-for-the-web#:~:text=For%20example%20delete%20content%20that,IndexedDB

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#:~:text=Also%2C%20IndexedDB%20storage%20in%20browsers,the%20incognito%20session%20is%20closed.

https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#:~:text=When%20using%20web%20technologies%20such,so%20without%20interrupting%20the%20user.

https://rxdb.info/articles/indexeddb-max-storage-limit.html#:~:text=persist()%20method%20to%20request,fail%20silently%20on%20stricter%20environments.

https://web.dev/articles/indexeddb#:~:text=A%20wrapper%20around%20an%20operation,be%20part%20of%20a%20transaction.

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#:~:text=Note%3A%20Like%20most%20web%20storage,access%20data%20across%20different%20domains.

Changed

{
  "files": [],
  // "references": [
  //   { "path": "./tsconfig.app.json" },
  //   { "path": "./tsconfig.node.json" }
  // ],
  "compilerOptions": {
    "allowJs": true,
    "esModuleInterop": true,
    "noImplicitAny": false
  },
  "include": ["src/**/*", "node_modules"]
}


popped out the //'s in tsconfig.json

npm uninstall typescript @types/node @types/react @types/react-dom
deleted tsconfig.json
changed package.json  "build": "tsc -b && vite build", chopped tsc
removed "typescript-eslint": "^8.39.1", from devDependencies

Ran

npm install -g serve
then
serve -s dist