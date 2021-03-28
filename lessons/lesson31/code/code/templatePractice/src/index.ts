import { template } from "./template";

document.getElementById("app").innerHTML = template(
  `<p>My name is {{NAME}}. And my friend are:</p>
<ul>
{{for friends}}<li>{{NAME}}, {{AGE}} y.o.</li>{{endfor}}
</ul>
`,
  {
    NAME: "Bob",
    friends: [
      {
        NAME: "Sam",
        AGE: "21",
      },
      {
        NAME: "Alice",
        AGE: 23,
      },
    ],
  }
);

/*
<p>My name is Bob. And my friend are:</p>
<ul>
<li>Sam, 21 y.o.</li><li>Alice, 23 y.o.</li>
</ul>
*/
