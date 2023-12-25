const submitForm = formEl => {
    if (!formEl) return;
 
    formEl.validate(async valid => {
       if (valid) {
          console.log("submit!");
 
          const username = ruleForm.username;
          const password = ruleForm.pass;
          console.log(username, password);
 
          /* 执行登录，并将结果丢vuex */
          const { msg, user, token } = await login(username, password);
          ElMessage({
             message: msg,
             type: user ? "success" : "error",
          });
 
          /* 如果登录成功跳转 */
          if (user) {
             /* 将user和token丢vuex */
             store.dispatch("saveUserInfo", { user, token });
 
             setTimeout(() => {
                router.push("/");
             }, 500);
          }
       } else {
          console.log("error submit!");
          return false;
       }
    });
 };
 