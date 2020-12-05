const ArticlesService = require('../src/articles-service');
const knex = require('knex');

const { expect } = require("chai");

describe('Articles service object', function() {
    let db;
    let testArticles = [
        {
            title: 'First test post!',
            content: 'Lorem ipsum dolor sit amet',
        },
        {
            title: 'Second test post!',
            content: 'Lorem ipsum dolor sit amet',
        },
        {
            title: 'Third test post!',
            content: 'Lorem ipsum dolor sit amet'
        }
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
    context('Given "blogful_articles" has data,', () => {
        before(() => db('blogful_articles').truncate())
        before(() => {
            db.into('blogful_articles').insert(testArticles);
        })
        afterEach(() => db('blogful_articles').truncate());
        it('getAllArticles() resolves all articles from "blogful_articles" table', (done) => {
            return ArticlesService.getAllArticles(db)
            .then(actual => {
                console.log(JSON.stringify(actual));
                expect(actual).to.eql(testArticles);
                done();
            })
        });
        after(() => {
            db.destroy();
        })
    });
    context(`Given 'blogful_articles' has no data`, () => {
        it(`getAllArticcles() resolves an empty array`, (done) => {
            return ArticlesService.getAllArticles(db)
            .then(atual => {
                expect(actual).to.eql([]);
                done();
            })
        })
    })
});