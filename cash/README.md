<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Cash](#cash)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Convert a certain amount of money to default currencies.](#convert-a-certain-amount-of-money-to-default-currencies)
    - [Convert a certain amount of money specifying the currency of that amount and the target currencies.](#convert-a-certain-amount-of-money-specifying-the-currency-of-that-amount-and-the-target-currencies)
    - [Change the default currencies.](#change-the-default-currencies)
  - [Help](#help)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Cash

This module allows you to make conversion between different currencies. <br />

## Installation

Clone the project:
```sh
❯ git clone https://github.com/felixlarrouy/3-musketeers.git
```

Install npm dependencies:
```sh
❯ npm install
```

## Usage

To use it, you have multiple options:

### Convert a certain amount of money to default currencies.

For example, if you want to convert 1$ **USD**, use this command:


```
$ node index.js 1 usd

✔ 0.81 (EUR) Euro
✔ 0.72 (GBP) Pound Sterling
```

This will convert 1$ USD in default currencies:  Euro (EUR) and Pound Sterling (GBP).

### Convert a certain amount of money specifying the currency of that amount and the target currencies.

For example, if you want to convert 1$ **USD** in **EUR**, **PLN**, and **AUD**, use this command:

```
$ node index.js 1 usd eur pln aud

✔ 0.81 (EUR) Euro
✔ 3.42 (PLN) Polish Zloty
✔ 1.28 (AUD) Australian Dollar

```

### Change the default currencies.

For example, if you want to save **EUR**, **PLN**, and **AUD** as default currencies, use this command:

```sh
❯ node bin/index.js --save eur pln aud
```

## Help
To display **help** message, just run:
```sh
❯ node index.js --help
```

The list of **currencies** is available at the following link: http://akep.us/currencies
