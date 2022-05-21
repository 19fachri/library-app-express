const nodemailer = require("nodemailer");
const { User } = require("../models");

module.exports = {
  sendMail(email, action, book) {
    return new Promise((resolve, reject) => {
      // try {
      console.log("mailer jalan");
      // const users = await User.findAll();
      let reciverList;
      User.findAll()
        .then((users) => {
          reciverList = users.map((el) => el.email).join(", ");
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.APP_EMAIL,
              pass: process.env.APP_EMAIL_PASS,
            },
          });

          // let info = await transporter.sendMail({
          transporter.sendMail(
            {
              from: `<${process.env.APP_EMAIL}>`, // sender address
              to: reciverList, // list of receivers
              subject: "Histories", // Subject line
              // text: `
              // <h1>Halo ${item.User.username}</h1>
              // <p>Pesanan anda dengan deskrips :</p>

              // <ul>
              //     <li>Nama Product : ${item.Product.name}</li>
              //     <li>Harga Satuan: ${formatPrice(item.Product.price).toString()}</li>
              //     <li>Jumlah Pesanan : ${item.amount}</li>
              //     <li>Total Biaya : ${formatPrice(item.totalPrice).toString()}</li>
              // </ul>
              // <p>Akan kami proses, Terima kasih</p>
              // `, // html body
              html: `
            <p>User ${email} telah melakukan ${action} pada tanggal ${new Date()}</p>
            <br>
            <h3>deskripsi buku :</h3>
              <li>id : ${book.id}</li>
              <li>title : ${book.title}</li>
            <br>
            <p>Sekian dan terima kasih</p>
            `, // html body
            },
            (err) => {
              console.log(err);
              if (!err) resolve();
              else reject();
            }
          );
        })
        .catch((err) => console.log(err));
      // } catch (error) {}
    });
  },
};
