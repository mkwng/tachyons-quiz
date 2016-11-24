import React from 'react';
import Head from 'next/head';
import jQuery from 'jquery'

var _ = require('lodash');
var DATA = {
  "questions": [
    {
      "id": 1,
      "question": "font-size: 3rem; //1st step in size scale",
      "answer": "f1",
      "categories": ["Typography", "Type Scale"],
      "url": "http://tachyons.io/docs/typography/scale/"
    },
    {
      "id": 2,
      "question": "font-size: 2.25rem; //2nd step in size scale",
      "answer": "f2",
      "categories": ["Typography", "Type Scale"],
      "url": "http://tachyons.io/docs/typography/scale/"
    },
    {
      "id": 3,
      "question": "font-size: 1.5rem; //3rd step in size scale",
      "answer": "f3",
      "categories": ["Typography", "Type Scale"],
      "url": "http://tachyons.io/docs/typography/scale/"
    },
    {
      "id": 4,
      "question": "font-size: 1.25rem; //4th step in size scale",
      "answer": "f4",
      "categories": ["Typography", "Type Scale"],
      "url": "http://tachyons.io/docs/typography/scale/"
    },
    {
      "id": 5,
      "question": "font-size: 1rem; //5th step in size scale",
      "answer": "f5",
      "categories": ["Typography", "Type Scale"],
      "url": "http://tachyons.io/docs/typography/scale/"
    },
    {
      "id": 6,
      "question": "font-size: .875rem; //6th step in size scale",
      "answer": "f6",
      "categories": ["Typography", "Type Scale"],
      "url": "http://tachyons.io/docs/typography/scale/"
    },



    {
      "id": 7,
      "question": "max-width: 30em; //~66 characters",
      "answer": "measure",
      "categories": ["Typography", "Measure"],
      "url": "http://tachyons.io/docs/typography/measure/"
    },
    {
      "id": 8,
      "question": "max-width: 34em; //~80 characters",
      "answer": "measure-wide",
      "categories": ["Typography", "Measure"],
      "url": "http://tachyons.io/docs/typography/measure/"
    },
    {
      "id": 9,
      "question": "max-width: 20em; //~45 characters",
      "answer": "measure-narrow",
      "categories": ["Typography", "Measure"],
      "url": "http://tachyons.io/docs/typography/measure/"
    },



    {
      "id": 10,
      "question": "line-height: 1;",
      "answer": "lh-solid",
      "categories": ["Typography", "Line Height"],
      "url": "http://tachyons.io/docs/typography/line-height/"
    },
    {
      "id": 11,
      "question": "line-height: 1.25;",
      "answer": "lh-title",
      "categories": ["Typography", "Line Height"],
      "url": "http://tachyons.io/docs/typography/line-height/"
    },
    {
      "id": 12,
      "question": "line-height: 1.5;",
      "answer": "lh-copy",
      "categories": ["Typography", "Line Height"],
      "url": "http://tachyons.io/docs/typography/line-height/"
    },



    {
      "id": 13,
      "question": "letter-spacing: .1em;",
      "answer": "tracked",
      "categories": ["Typography", "Tracking"],
      "url": "http://tachyons.io/docs/typography/tracking/"
    },
    {
      "id": 14,
      "question": "letter-spacing: -0.5em;",
      "answer": "tracked-tight",
      "categories": ["Typography", "Tracking"],
      "url": "http://tachyons.io/docs/typography/tracking/"
    },
    {
      "id": 15,
      "question": "letter-spacing: .25em;",
      "answer": "tracked-mega",
      "categories": ["Typography", "Tracking"],
      "url": "http://tachyons.io/docs/typography/tracking/"
    },



    {
      "id": 16,
      "question": "font-weight: normal;",
      "answer": "normal",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 17,
      "question": "font-weight: bold;",
      "answer": "bold",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 18,
      "question": "font-weight: 100;",
      "answer": "fw1",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 19,
      "question": "font-weight: 200;",
      "answer": "fw2",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 20,
      "question": "font-weight: 300;",
      "answer": "fw3",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 21,
      "question": "font-weight: 400;",
      "answer": "fw4",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 22,
      "question": "font-weight: 500;",
      "answer": "fw5",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 23,
      "question": "font-weight: 600;",
      "answer": "fw6",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 24,
      "question": "font-weight: 700;",
      "answer": "fw7",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 25,
      "question": "font-weight: 800;",
      "answer": "fw8",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },
    {
      "id": 26,
      "question": "font-weight: 900;",
      "answer": "fw9",
      "categories": ["Typography", "Font Weight"],
      "url": "http://tachyons.io/docs/typography/font-weight/"
    },



    {
      "id": 27,
      "question": "font-style: italic;",
      "answer": "i",
      "categories": ["Typography", "Font Style"],
      "url": "http://tachyons.io/docs/typography/font-style/"
    },
    {
      "id": 28,
      "question": "font-style: normal;",
      "answer": "fs-normal",
      "categories": ["Typography", "Font Style"],
      "url": "http://tachyons.io/docs/typography/font-style/"
    },



    {
      "id": 29,
      "question": "vertical-align: baseline;",
      "answer": "v-base",
      "categories": ["Typography", "Vertical Align"],
      "url": "http://tachyons.io/docs/typography/vertical-align/"
    },
    {
      "id": 30,
      "question": "vertical-align: middle;",
      "answer": "v-mid",
      "categories": ["Typography", "Vertical Align"],
      "url": "http://tachyons.io/docs/typography/vertical-align/"
    },
    {
      "id": 31,
      "question": "vertical-align: top;",
      "answer": "v-top",
      "categories": ["Typography", "Vertical Align"],
      "url": "http://tachyons.io/docs/typography/vertical-align/"
    },
    {
      "id": 32,
      "question": "vertical-align: bottom;",
      "answer": "v-btm",
      "categories": ["Typography", "Vertical Align"],
      "url": "http://tachyons.io/docs/typography/vertical-align/"
    },



    {
      "id": 33,
      "question": "text-align: left;",
      "answer": "tl",
      "categories": ["Typography", "Text Align"],
      "url": "http://tachyons.io/docs/typography/text-align/"
    },
    {
      "id": 34,
      "question": "text-align: right;",
      "answer": "tr",
      "categories": ["Typography", "Text Align"],
      "url": "http://tachyons.io/docs/typography/text-align/"
    },
    {
      "id": 35,
      "question": "text-align: center;",
      "answer": "tc",
      "categories": ["Typography", "Text Align"],
      "url": "http://tachyons.io/docs/typography/text-align/"
    },



    {
      "id": 36,
      "question": "text-transform: capitalize;",
      "answer": "ttc",
      "categories": ["Typography", "Text Transform"],
      "url": "http://tachyons.io/docs/typography/text-transform/"
    },
    {
      "id": 37,
      "question": "text-transform: lowercase;",
      "answer": "ttl",
      "categories": ["Typography", "Text Transform"],
      "url": "http://tachyons.io/docs/typography/text-transform/"
    },
    {
      "id": 38,
      "question": "text-transform: uppercase;",
      "answer": "ttu",
      "categories": ["Typography", "Text Transform"],
      "url": "http://tachyons.io/docs/typography/text-transform/"
    },
    {
      "id": 39,
      "question": "text-transform: none;",
      "answer": "ttn",
      "categories": ["Typography", "Text Transform"],
      "url": "http://tachyons.io/docs/typography/text-transform/"
    },



    {
      "id": 40,
      "question": "text-decoration: line-through;",
      "answer": "strike",
      "categories": ["Typography", "Text Decoration"],
      "url": "http://tachyons.io/docs/typography/text-decoration/"
    },
    {
      "id": 41,
      "question": "text-decoration: underline;",
      "answer": "underline",
      "categories": ["Typography", "Text Decoration"],
      "url": "http://tachyons.io/docs/typography/text-decoration/"
    },
    {
      "id": 42,
      "question": "text-decoration: none;",
      "answer": "no-underline",
      "categories": ["Typography", "Text Decoration"],
      "url": "http://tachyons.io/docs/typography/text-decoration/"
    },



    {
      "id": 43,
      "question": "white-space: normal;",
      "answer": "ws-normal",
      "categories": ["Typography", "White Space"],
      "url": "http://tachyons.io/docs/typography/white-space/"
    },
    {
      "id": 44,
      "question": "white-space: nowrap;",
      "answer": "nowrap",
      "categories": ["Typography", "White Space"],
      "url": "http://tachyons.io/docs/typography/white-space/"
    },
    {
      "id": 45,
      "question": "white-space: pre;",
      "answer": "pre",
      "categories": ["Typography", "White Space"],
      "url": "http://tachyons.io/docs/typography/white-space/"
    },



    {
      "id": 46,
      "question": "box-sizing: border-box;",
      "answer": "border-box",
      "categories": ["Layout", "Box Sizing"],
      "url": "http://tachyons.io/docs/layout/box-sizing/"
    },



    {
      "id": 47,
      "question": "padding: 0; //--spacing-none",
      "answer": "pa0",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 56,
      "question": "padding-left: .25rem; //--spacing-extra-small",
      "answer": "pl1",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 65,
      "question": "padding-right: .5rem; //--spacing-small",
      "answer": "pr2",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 74,
      "question": "padding-bottom: 1rem; //--spacing-medium",
      "answer": "pb3",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 83,
      "question": "padding-top: 2rem; //--spacing-large",
      "answer": "pt4",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 106,
      "question": "margin: 4rem; //--spacing-extra-large",
      "answer": "ma5",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 124,
      "question": "margin-right: 8rem; //--spacing-extra-extra-large",
      "answer": "mr6",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },
    {
      "id": 142,
      "question": "margin-top: 16rem; //--spacing-extra-extra-extra-large",
      "answer": "mt7",
      "categories": ["Layout", "Spacing"],
      "url": "http://tachyons.io/docs/layout/spacing/"
    },



    {
      "id": 160,
      "question": "float: left; _display: inline;",
      "answer": "fl",
      "categories": ["Layout", "Floats"],
      "url": "http://tachyons.io/docs/layout/floats/"
    },
    {
      "id": 161,
      "question": "float: right; _display: inline;",
      "answer": "fr",
      "categories": ["Layout", "Floats"],
      "url": "http://tachyons.io/docs/layout/floats/"
    },
    {
      "id": 162,
      "question": "float: none;",
      "answer": "fn",
      "categories": ["Layout", "Floats"],
      "url": "http://tachyons.io/docs/layout/floats/"
    },



    {
      "id": 163,
      "question": "clear: both; //Clearfix solution",
      "answer": "cf",
      "categories": ["Layout", "Clearfix"],
      "url": "http://tachyons.io/docs/layout/clearfix/"
    },



    {
      "id": 164,
      "question": "display: none;",
      "answer": "dn",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 165,
      "question": "display: inline;",
      "answer": "di",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 166,
      "question": "display: block;",
      "answer": "db",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 167,
      "question": "display: inline-block;",
      "answer": "dib",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 168,
      "question": "display: inline-table;",
      "answer": "dit",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 169,
      "question": "display: table;",
      "answer": "dt",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 170,
      "question": "display: table-cell;",
      "answer": "dtc",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 171,
      "question": "display: table-row;",
      "answer": "dt-row",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 172,
      "question": "display: table-row-group;",
      "answer": "dt-row-group",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 173,
      "question": "display: table-column;",
      "answer": "dt-column",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },
    {
      "id": 174,
      "question": "display: table-column-group;",
      "answer": "dt-column-group",
      "categories": ["Layout", "Display"],
      "url": "http://tachyons.io/docs/layout/display/"
    },



    {
      "id": 175,
      "question": "width: 1rem; // 1st step in width scale",
      "answer": "w1",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 176,
      "question": "width: 2rem; // 2nd step in width scale",
      "answer": "w2",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 177,
      "question": "width: 4rem; // 3rd step in width scale",
      "answer": "w3",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 178,
      "question": "width: 8rem; // 4th step in width scale",
      "answer": "w4",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 179,
      "question": "width: 16rem; // 5th step in width scale",
      "answer": "w5",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 180,
      "question": "width: 10%;",
      "answer": "w-10",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 182,
      "question": "width: 25%;",
      "answer": "w-25",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 184,
      "question": "width: 33%;",
      "answer": "w-33",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 193,
      "question": "width: 100%;",
      "answer": "w-100",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 194,
      "question": "width: calc(100% / 3);",
      "answer": "w-third",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 195,
      "question": "width: calc(100% / 1.5);",
      "answer": "w-two-thirds",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },
    {
      "id": 196,
      "question": "width: auto;",
      "answer": "w-auto",
      "categories": ["Layout", "Widths"],
      "url": "http://tachyons.io/docs/layout/widths/"
    },



    {
      "id": 197,
      "question": "max-width: 100%;",
      "answer": "mw-100",
      "categories": ["Layout", "Max Widths"],
      "url": "http://tachyons.io/docs/layout/max-widths/"
    },
    {
      "id": 198,
      "question": "max-width: 1rem; //1st step in width scale",
      "answer": "mw1",
      "categories": ["Layout", "Max Widths"],
      "url": "http://tachyons.io/docs/layout/max-widths/"
    },
    {
      "id": 209,
      "question": "max-width: 96rem; //9th step in width scale",
      "answer": "mw9",
      "categories": ["Layout", "Max Widths"],
      "url": "http://tachyons.io/docs/layout/max-widths/"
    },
    {
      "id": 210,
      "question": "max-width: none;",
      "answer": "mw-none",
      "categories": ["Layout", "Max Widths"],
      "url": "http://tachyons.io/docs/layout/max-widths/"
    },



    {
      "id": 211,
      "question": "height: 1rem; // 1st step in height scale",
      "answer": "h1",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 212,
      "question": "height: 2rem; // 2nd step in height scale",
      "answer": "h2",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 213,
      "question": "height: 4rem; // 3rd step in height scale",
      "answer": "h3",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 214,
      "question": "height: 8rem; // 4th step in height scale",
      "answer": "h4",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 215,
      "question": "height: 16rem; // 5th step in height scale",
      "answer": "h5",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 216,
      "question": "height: 25%;",
      "answer": "h-25",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 217,
      "question": "height: 50%;",
      "answer": "h-50",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 218,
      "question": "height: 75%;",
      "answer": "h-75",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 219,
      "question": "height: 100%;",
      "answer": "h-100",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 220,
      "question": "min-height: 100%;",
      "answer": "min-h-100",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 221,
      "question": "height: 25vh;",
      "answer": "vh-25",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 222,
      "question": "height: 50vh;",
      "answer": "vh-50",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 223,
      "question": "height: 75vh;",
      "answer": "vh-75",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 224,
      "question": "height: 100vh;",
      "answer": "vh-100",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 225,
      "question": "min-height: 100vh;",
      "answer": "min-vh-100",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 226,
      "question": "height: auto;",
      "answer": "h-auto",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },
    {
      "id": 227,
      "question": "height: inherit;",
      "answer": "h-inherit",
      "categories": ["Layout", "Heights"],
      "url": "http://tachyons.io/docs/layout/heights/"
    },



    {
      "id": 228,
      "question": "position: static;",
      "answer": "static",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 229,
      "question": "position: relative;",
      "answer": "relative",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 230,
      "question": "position: absolute;",
      "answer": "absolute",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 231,
      "question": "position: fixed;",
      "answer": "fixed",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 232,
      "question": "top: 0;",
      "answer": "top-0",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 233,
      "question": "right: 0;",
      "answer": "right-0",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 234,
      "question": "bottom: 0;",
      "answer": "bottom-0",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 235,
      "question": "left: 0;",
      "answer": "left-0",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 243,
      "question": "top: 2rem;",
      "answer": "top-2",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 244,
      "question": "right: 2rem;",
      "answer": "right-2",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 245,
      "question": "bottom: 2rem;",
      "answer": "bottom-2",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 246,
      "question": "left: 2rem;",
      "answer": "left-2",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 247,
      "question": "top: -1rem;",
      "answer": "top--1",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 248,
      "question": "right: -1rem;",
      "answer": "right--1",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 249,
      "question": "bottom: -1rem;",
      "answer": "bottom--1",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 250,
      "question": "left: -1rem;",
      "answer": "left--1",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },
    {
      "id": 255,
      "question": "top:0; right:0; bottom:0; left:0;",
      "answer": "absolute--fill",
      "categories": ["Layout", "Position"],
      "url": "http://tachyons.io/docs/layout/position/"
    },

  ]
};



var MYDATA = {
  score: 0,
  log: [],
  questions: [
    {
      id: 16,
      proficiency: 1,
      correct: 1,
      seen: 1
    },
    {
      id: 7,
      proficiency: 0,
      correct: 1,
      seen: 1
    }
  ]
}


var StyleQuestionBlock = React.createClass({
  getInitialState: function() {
    return {
      "answer": this.props.answer || ""
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      if (this.textInput) this.textInput.focus();
    }.bind(this),50);
  },

  onAnswerChange: function(e) {
    this.setState({ answer: e.target.value });
    e.target.style.width = Math.max(e.target.value.length,1) + "ch";
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.setState({answer: ""});
    this.textInput.style.width = "1ch";
    return this.props.onAnswer(this.state.answer);
  },

  render: function() {
    var isCorrect = this.props.answer === this.props.tachyonsStyle.answer;
    var comment = (
      <code className="db w-100 white-30 i">
        { "// " }
        { this.props.tachyonsStyle.categories[0] + ": " + this.props.tachyonsStyle.categories[1] + ". " }
        <a className="white-30" href={this.props.tachyonsStyle.url}>See documentation</a>.
      </code>
    );
    var selector = this.props.isEditable
      ? (
        <code className="db w-100">
          <form onSubmit={this.onSubmit} className="dib green">
            .<input
              className="w1 outline-0 b--none pa0 bg-transparent green"
              type="text"
              value={this.state.answer}
              onChange={this.onAnswerChange}
              ref={(input) => { this.textInput = input; }}
              />
          </form>
          { " {" }
        </code>
      ) : (
          <code className={ isCorrect ? "correct db w-100" : "wrong db w-100" }>
            <span className={ isCorrect ? "green" : "bg-red white" }>.{ this.props.answer }</span>
            { " {" }
            <span className={ isCorrect ? "dn white-30 i" : "di white-30 i" }>{ " // Correct answer: " + this.props.tachyonsStyle.answer }</span>
          </code>
        );
    var property = (<code className="db w-100 pl3">{ this.props.tachyonsStyle.question }</code>);
    return (
      <pre className="w-100 tl mv0">
        <code className="db w-100">{ " " }</code>
        { comment }
        { selector }
        { property }
        <code className="db w-100">{ "}" }</code>
      </pre>
    );
  }
});

var StyleQuestionLog = React.createClass({
  componentDidUpdate: function(prevProps, prevState) {
    setTimeout(function() {
      this.props.didAdd();
    }.bind(this),50);
  },

  render: function() {
    return (
      <div>
        { this.props.questionLog.map( (logEntry, i) => (
            <StyleQuestionBlock
              tachyonsStyle={ logEntry.tachyonsStyle }
              answer={ logEntry.answer }
              isEditable={ false }
              key={ i }
            />
        ) ) }
      </div>
    );
  }
});

var Application = React.createClass({
  getInitialState: function() {
    var initialData = this.props.myData;
    initialData.questions = _.orderBy(_.shuffle(initialData.questions), ['seen', 'proficiency'], ['asc', 'asc']);
    return {
      data: initialData,
      currentQuestionID: initialData.questions[0].id,
      previousQuestionID: null,
    };
  },

  onAnswer: function(userAnswer) {
    var question = _.find(this.state.data.questions, { id: this.state.currentQuestionID });
    var tachyonsStyle = _.find(DATA.questions, { id: this.state.currentQuestionID });
    question.seen += 1;

    if (userAnswer === tachyonsStyle.answer) {
      console.log("Correct");
      question.proficiency += 1;
      question.correct += 1;
      this.state.score += 1;
    } else {
      console.log("Wrong");
      question.proficiency = Math.max(question.proficiency - 1, 0);
    }

    // Change question
    this.state.data.log.push({
      id: this.state.data.log.length,
      tachyonsStyle: tachyonsStyle,
      answer: userAnswer
    });
    this.state.currentQuestionID = this.nextQuestionID();
    this.setState(this.state);
  },

  addQuestion: function(num) {
    var num = num ? num : 1;

    // Query for random array with answered questions filtered out
    var answered = _.map(this.state.data.questions, 'id');
    var filteredQuestions = _.pickBy(DATA.questions, function(value, key) {
      return !_.includes(answered, value.id);;
    });
    var available = _.shuffle(_.map(filteredQuestions, "id"));

    if (available.length) {
      var count = available.length > num ? num : available.length;
      for(var i = 0; i < count; i++) {
        this.state.data.questions.push({
          id: available[i],
          proficiency: 0,
          correct: 0,
          seen: 0,
        });
      }
      this.setState(this.state);
      console.log("New Question Added!");
      return available[0];
    } else {
      console.log("No more new questions to add");
      return false;
    }

  },

  nextQuestionID: function() {
    // Store the previous ID
    this.state.previousQuestionID = this.state.currentQuestionID;

    // Get the first one in the list that hasn't been seen.
    var nextQuestion = this.state.currentQuestionID ?
      _.findIndex(this.state.data.questions, { id: this.state.currentQuestionID })
      : -1;

    if (this.state.data.questions[nextQuestion+1] && this.state.data.questions[nextQuestion+1].proficiency <= 4) {
      return this.state.data.questions[nextQuestion+1].id;
    } else {
      this.addQuestion(5);
      console.log("All questions seen. Adding 5 more.")
      this.state.data.questions = _.orderBy(_.shuffle(this.state.data.questions), ['proficiency','seen'], ['asc', 'asc']);
      this.setState(this.state);
      return this.state.data.questions[0].id;
    }
  },

  didAddLog: function() {
    jQuery(this.scrollWindow).animate({ scrollTop: jQuery(this.innerWindow).innerHeight() }).bind(this);
  },

  render: function() {
    var target =  _.find(DATA.questions, {id: this.state.currentQuestionID});
    var previous = _.find(DATA.questions, {id: this.state.previousQuestionID}) || {answer:"", url:""};
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro" />
        </Head>
        <div className="vh-100 pa4 mw7 center">
          <h1 className="f5 mv4">Tachyons Quiz</h1>
          <p className="f5 mt4 mb5">Learn Tachyons by memorizing the class names. <a href="http://tachyons.io" target="_blank">What is Tachyons?</a></p>

          <div className="w-100 vh-50 bg-black-80 white-80 overflow-hidden br3 relative">
            <div className="absolute top-0 left-0 w-100 h2 bg-white-50">
              <span className="w1 h1 br-100 bg-white-50 dib mv2 mr1 ml2"></span>
              <span className="w1 h1 br-100 bg-white-50 dib mv2 mh1"></span>
              <span className="w1 h1 br-100 bg-white-50 dib mv2 mh1"></span>
            </div>

            <div 
              className="w-100 h-100 overflow-hidden pv4"
              ref={ (div) => { this.scrollWindow = div; } }
            >
            <div 
              className="w-100"
              ref={ (div) => { this.innerWindow = div; } }
            >
              <StyleQuestionLog
                questionLog={ this.props.myData.log }
                didAdd={ this.didAddLog }
              />
              <StyleQuestionBlock
                tachyonsStyle={ target }
                isEditable={ true }
                onAnswer={ function(isCorrect) {this.onAnswer(isCorrect)}.bind(this) }
              />
              <br /> 
            </div>
            </div>

            <div className="absolute bottom-0 left-0 w-100 h2 bg-black-90"></div>

          </div>

        </div>
      </div>
    );
  }
})

export default () => <Application questions={DATA.questions} myData ={MYDATA} />
