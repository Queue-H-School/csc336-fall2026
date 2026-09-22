# Lecture 2: HTML and CSS #

<u>Hypertext</u></br>
*Ted Nelson and Nevadvar?? Bush*</br>
\- Linking structure succeeds a (strict) tree structure</br>
\- clicking on words to link to other pages</br>
\- HyperText Markup Language</br>

<u>Document Object Model (DOM)</u></br>
\- parses html</br>
\- compare to SAX</br>

<pre>
document object model
└── html
    ├── head
    │   └── title
    └── body
        ├── p
        │   └── text
        ├── div
        │   ├── text
        │   └── img
        └── div
            ├── text
            └── span
</pre>

### CSS Demo: ###

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>CSS Demo from Class</title>
    </head>
    <body>
        <p style="background-color: #00FFFF; margin: 5; border: 1px solid #000000;">top paragraph</p>
        <div style="background-color: #FFFF00;">bottom paragraph
            <img src="darcy-dog.jpeg" height="480"/></div>
        <div style="background-color: #00FF00;">bottom paragraph
            text <span><img src="darcy-dog.jpeg" height="50"/></span> more text
        </div>
    </body>
</html>
```

![css_padding-4041656775.webp](images/css_padding-4041656775.webp)

<u>Stylesheet</u></br>
\- tag: no special formatting</br>
\- class="classname": .classname</br>
\- id="idtag": #idtag</br>