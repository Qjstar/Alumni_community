// change(file, fileLists) {
//     console.log(file);
//     console.log(fileLists);
//     //   let file = e.raw;
//     let 图片数组 = fileLists;
//     let 完成数组 = []
//     for (let i of 图片数组) {
//       let reader = new FileReader();
//       reader.onload = (e) => {
//         console.log(e.target.result); // 这是图片的 Base64 编码
//         完成数组.push(e.target.result)
//         this.未上传图片 = 完成数组
//         console.log(this.未上传图片)
//         this.$emit("imgs", this.未上传图片)
//       };
//       reader.readAsDataURL(i.raw);
//     }
//   },
