//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./server");
var expect = require("chai").expect;

chai.use(chaiHttp);
//Our parent block

describe("/POST signin", () => {
  beforeEach(done => {
    //Before each test we empty the database in your case
    done();
  });
  describe("Books", () => {
    it("it should POST signin", done => {
      let data = {
        usernameSignIn: `huanhuan`,
        pwdSignIn: `121`
      };
      chai
        .request(server)
        .post("/signin")
        .send(data)
        .end((err, res) => {
          //res.should.have.status(200);
          expect(res.status).to.equal(200);
          done();
        });
    });
    //   it("it should not POST a book without status field", done => {
    //     let pet = {
    //       name: "Bug"
    //     };
    //     chai
    //       .request(server)
    //       .post("/pets")
    //       .send(pet)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("object");
    //         res.body.should.have.property("message").eql("Pet is invalid!");
    //         done();
    //       });
    //   });
  });
});
