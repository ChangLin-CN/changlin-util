let expect = require('chai').expect;

module.exports=function({extend}){
    
    describe('extend.js  extend(true,{},{a:1,b:2,c:{c1:1}})', function () {
        let target = extend(true, {}, {a: 1, b: 2, c: {c1: 1}});
        
        it('target.b should be 2', function () {
            expect(target.b).to.equal(2);
        });
    });

    describe('extend.js  extend(true,{a:1,b:2,c:{c1:1}})', function () {
        const source={a: 1, b: 2, c: {c1: 1}}
        const target = extend(true,  source);
        target.c.c1=2
        it('target.b should be 2', function () {
            expect(target.b).to.equal(2);
        });
        it('source.c.c1 should be 2', function () {
            expect(source.c.c1).to.equal(1);
        });
    });

    describe('extend.js  extend(true,{},{a:1,b:2,c:{c1:1}})', function () {
        let source  = {a: 1, b: 2, c: {c1: 1}};
        let target  = extend(true, {}, source);
        source.c.c1 = 4;
        
        it(' source.c.c1=4 .  target.c.c1 should be 1', function () {
            expect(target.c.c1).to.equal(1);
        });
    });
    
    describe('extend.js  extend(false,{},{a:1,b:2,c:{c1:1}})', function () {
        let source  = {a: 1, b: 2, c: {c1: 1}};
        let target  = extend(false, {}, source);
        source.c.c1 = 4;
        
        it(' source.c.c1=4 .  target.c.c1 should be 4', function () {
            expect(target.c.c1).to.equal(4);
        });
    });
    
};
