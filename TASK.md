# Library searcher

This project implements a simple UI to search books in library.
It utilizes [HELMET-KIRJASTOJEN AINEISTOLUETTELOT API](https://api.finna.fi/swagger-ui/?url=%2Fapi%2Fv1%3Fswagger#!)
to find books.

Implement tasks 1 and 2. You are free to modify/refactor anything in the
codebase.

## Task 1

The current implementation only allows searching books by its title. Many users
have often requested that they would also like to search books by eg.
author's name. Implement a way to search for books by author's name (or some
other field/fields of your choice) and display the chosen field in the result
list as well.

## Task 2

The current implementation does not allow user to browse the returned results
in anyway since only the most relevant 20 are displayed..
 Implement a way for the user to easily browse more results that match the given search parameters