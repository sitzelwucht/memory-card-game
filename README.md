# Memory Game


## Objective

The player's challenge is to match the pairs of cards in as few moves as possible and/or as quickly as possible.

## How to play

First the player is prompted to select a board size, after which a grid with cards is created. The cards are opened by clicking on them, if a pair is found the two cards are removed from the board. At the end a different icon is shown on the empty board according to the player's result.

## Structure

The game is simple with one file for vanilla JS, HTML and CSS each, additionally a separate server.js file (uses express, which requires installation through package.json). As the pictures on the cards I have used various unicode characters, which may or may not display properly depending on the device. 