<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <header>
      <div class="actionBox">
        <span>
          <h4><b>Admin Area</b></h4>
        </span>
      </div>

      <div class="actionBox">
        <span>
          <h5>Time left</h5>
          <span>{{ timer.remaining }}</span>
        </span>
      </div>

      <div class="actionBox">
        <span
          ><h5>Date Session</h5>
          <span>{{ session }} / {{ maxSessions }}</span></span
        >
      </div>

      <div
        @click="toggleTimer"
        class="actionBox"
        :class="{ actionToggle: !timer.active, disabledToggle: timer.active }"
      >
        <span>
          <h5>Start session</h5>
          <i class="fa fa-play icon"></i
        ></span>
      </div>

      <div @click="autoAssign" class="actionBox actionToggle">
        <span>
          <h5>Auto Assign</h5>
          <i class="fa fa-random icon"></i>
        </span>
      </div>

      <div
        style="z-index: 100"
        class="actionBox actionToggle"
        @click="cheatBoxActive = !cheatBoxActive"
      >
        <span> Cheats </span>
        <div class="menuBox" v-if="cheatBoxActive">
          <ul>
            <li v-if="!kraken" @click="loadRemainingParticipants">
              Release the Kraken
            </li>
            <li v-else>Kraken is already released</li>
            <li>Never press this button</li>
          </ul>
        </div>
      </div>
    </header>

    <div class="wrapper">
      <div class="sidebar">
        <h4>Unassigned ({{ unassigned.length }})</h4>
        <center v-if="unassigned.length == 0">No unassigned geeks</center>
        <div v-else>
          <UserCard
            v-for="p in unassigned"
            :key="p.id"
            format="small"
            :hoverable="true"
            :draggable="true"
            :fullname="p.fullname"
            :picture="p.picture"
            :location="p.location"
            @dragstart.native="startDrag($event, p)"
          />
        </div>
      </div>

      <div class="workspace">
        <div class="tableArea">
          <div
            class="tableBox"
            :key="table.id"
            v-for="table in tables"
            @dragover.prevent
            @dragenter.prevent
            @drop.prevent="onDrop($event, table)"
            :class="{ over: table.isOver }"
          >
            <h3>Table {{ table.id }}</h3>
            <UserCard
              v-if="tableData(table.id)[0] != null"
              format="small"
              :hoverable="true"
              :draggable="true"
              :fullname="tableData(table.id)[0].fullname"
              :picture="tableData(table.id)[0].picture"
              :location="tableData(table.id)[0].location"
              @dragstart.native="startDrag($event, tableData(table.id)[0])"
            />
            <UserCard v-else format="placeholder" />

            <UserCard
              v-if="tableData(table.id)[1] != null"
              format="small"
              :hoverable="true"
              :draggable="true"
              :fullname="tableData(table.id)[1].fullname"
              :picture="tableData(table.id)[1].picture"
              :location="tableData(table.id)[1].location"
              @dragstart.native="startDrag($event, tableData(table.id)[1])"
            />
            <UserCard v-else format="placeholder" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      kraken: false,
      cheatBoxActive: false,
      dataChange: false,
      changeTimer: null,
      tables: [],
      participants: {
        count: 0,
        list: [],
      },
      serverTimer: null,
      session: 1,
      maxSessions: 3,
      timer: {
        active: false,
        remaining: "10:00",
      },
    };
  },
  created() {
    this.serverUpdate();
    this.serverTimer = setInterval(() => this.serverUpdate(), 100);
  },
  computed: {
    unassigned() {
      return this.participants.list.filter((p) => p.table == null);
    },
  },
  methods: {
    updateChanges() {
      fetch("http://localhost:3000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "updateUsers",
          users: this.participants.list,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.dataChange = false;
          }
        });
    },
    tableData(tableId) {
      return this.participants.list.filter((p) => p.table == tableId);
    },
    autoAssign() {
      fetch("http://localhost:3000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "autoAssign",
        }),
      });
    },
    loadRemainingParticipants() {
      fetch("http://localhost:3000/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "addRemaining",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    },
    toggleTimer() {
      fetch("http://localhost:3000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "toggleTimer",
        }),
      });
    },
    serverUpdate() {
      fetch("http://localhost:3000/admin_fetch")
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            const res = data.result;

            this.kraken = res.kraken;

            // TODO: Refresh tables
            if (!this.dataChange) {
              this.tables = res.tables;
            }

            this.participants.count = res.participants.length;

            // TODO: Refresh participants
            if (!this.dataChange) {
              this.participants.list = res.participants;
            }

            this.session = res.activeSession;

            this.timer.active = res.sessionStatus;

            const minutes =
              res.sessionTime.m < 10
                ? "0" + res.sessionTime.m
                : res.sessionTime.m;
            const seconds =
              res.sessionTime.s < 10
                ? "0" + res.sessionTime.s
                : res.sessionTime.s;

            this.timer.remaining = minutes + ":" + seconds;
          }
        });
    },
    startDrag(event, item) {
      clearTimeout(this.changeTimer);
      console.log("dataChange true");
      this.dataChange = true;
      event.dataTransfer.setData("participantId", item.id);
    },
    onDrop(event, table) {
      this.changeTimer = setTimeout(() => this.updateChanges(), 2000);
      if (this.tableData(table.id).length == 2) {
        return;
      }

      const participantId = event.dataTransfer.getData("participantId");

      if (!participantId) return;

      const participant = this.participants.list.find(
        (p) => p.id == participantId
      );

      participant.table = table.id;
    },
  },
};
</script>

<style scoped>
.over {
  background: black;
}
header {
  background: #eee;
  border-bottom: 1px solid rgb(75, 75, 75);
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
}

header .actionBox {
  min-width: 50px;
  height: 70px;
  line-height: 70px;
  padding: 0 15px;
  border-left: 1px solid rgb(75, 75, 75);
  border-bottom: 1px solid rgb(75, 75, 75);
  transition-duration: 0.3s;
  user-select: none;
}

.disabledToggle {
  color: #eee;
}

.disabledToggle h5,
.disabledToggle i {
  color: lightgrey;
}

.icon {
  font-size: 18pt;
  color: #626b51;
}

.actionBox.actionToggle:hover {
  background: #ddd;
  cursor: pointer;
  border-bottom: 1px solid rgb(75, 75, 75);
  transition-duration: 0.2s;
}

.actionBox:last-of-type {
  border-right: 1px solid rgb(75, 75, 75);
}

.actionBox > span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.actionBox .toggleButton {
  margin-left: 10px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 18pt;
  color: #626b51;
}

.wrapper {
  width: 100%;
  display: flex;
}

.sidebar {
  text-align: left;
  width: 340px;
  height: 700px;
  background-color: #eee;
  border-right: 1px solid rgb(75, 75, 75);
  border-bottom: 1px solid rgb(75, 75, 75);
  padding: 10px;
  overflow-y: scroll;
}

.sidebar h4 {
  text-align: center;
}

.workspace {
  padding: 20px;
  text-align: left;
  display: block;
  width: 100%;
}

.workspace h2 {
  margin-bottom: 20px;
}

.tableArea {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tableBox {
  width: 270px;
  display: inline-block;
  border: 1px solid #aaa;
  background-color: #eee;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
}

.tableBox h3 {
  font-size: 16pt;
  margin-bottom: 10px;
}

.menuBox {
  position: absolute;
  margin-top: -1px;
  margin-left: -16px;
  text-align: left;
  z-index: 100;
  padding: 10px;
  background: #eee;
  border: 1px solid #aaa;
  width: 200px;
}

.menuBox ul {
  line-height: 1.2;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menuBox li {
  padding: 10px;
}

.menuBox li + .menuBox li {
  border-top: 1px solid #ccc;
}

.menuBox li:hover {
  background: #aaa;
  color: white;
}
</style>