/*eslint-disable no-process-exit*/
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');

const API = 'https://api.fixer.io/latest';

/**
  * This function converts a certain amount of money in specified currency(ies)
  * @param {Conf()} configuration - object containing configuration variables needed for conversion
  * @param {string} amount - the amount of money to convert
  * @param {string} to - target currency(ies)
  * @param {string} from - origin currency
  * @param {string} response - JSON file containing conversion rates with EUR as base currency
  * @param {string} loading - terminal spinner
**/
const convert = configuration => {
  const {amount, to, from, response, loading} = configuration;

  money.base = response.body.base;
  money.rates = response.body.rates;

  to.forEach(item => {
    if (currencies[item]) {
      loading.succeed(
        `${chalk.green(
          money.convert(amount, {from, 'to': item}).toFixed(2)
        )} ${`(${item})`} ${currencies[item]}`
      );
    } else {
      loading.warn(`${chalk.yellow(` The ${item} currency not found `)}`);
    }
  });

  console.log();
  console.log(
    chalk.underline.gray(
      ` Conversion of ${chalk.bold(from)} ${chalk.bold(amount)}`
    )
  );
  process.exit(1);
};

/**
  * @param {Object} command - bject containing configuration variables needed for conversion
  * @param {string} amount - the amount of money to convert
  * @param {string} to - target currency(ies)
  * @param {string} from - origin currency
**/
const cash = async command => {
  const amount = command.amount;
  const from = command.from.toUpperCase();
  const to = command.to
    .filter(item => item !== from)
    .map(item => item.toUpperCase());

  console.log();
  const loading = ora({
    'text': 'Converting currency...',
    'color': 'green',
    'spinner': {
      'interval': 200,
      'frames': to
    }
  });

  loading.start();

  try {
    const response = await got(API, {'json': true});

    convert({amount, to, from, response, loading});
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      loading.fail(chalk.red('   Please check your internet connection.\n'));
    } else {
      loading.fail(chalk.red('   Internal server error... \n'));
    }

    process.exit(1);
  }
};

module.exports = cash;
