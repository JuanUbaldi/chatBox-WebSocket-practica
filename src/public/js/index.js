const socket = io();

//codigo del front

let nombreUsuario = "";
async function pedirNombre() {
  const { value: formValues } = await Swal.fire({
    title: "Coloca tu nombre",
    html: '<input id="swal-input1" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [document.getElementById("swal-input1").value];
    },
  });

  if (formValues) {
    nombreUsuario = formValues;
  }
}
pedirNombre();

const chatBox = document.getElementById("chat-box");
chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("FrontToBack", {
      user: nombreUsuario,
      msg: chatBox.value,
    });
    chatBox.value = "";
  }
});

socket.on("BackToFront", (msgs) => {
  let msgsFormateados = "";
  msgs.forEach((msg) => {
    msgsFormateados += `  <div style='border: 1px solid violet'>
 <p> ${msg.user} </p>
<p> ${msg.msg}</p> </div>
`;
    const divMsgs = document.getElementById("div-msgs");
    divMsgs.innerHTML = msgsFormateados;
  });
});
