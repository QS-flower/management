const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 模拟用户数据库
const users = [
  { id: 1, username: '2021080911032', password: 'Q520S1314' }
];
const testdata1 = [
  {
    value: 'Option1-1',
    label: '第一次月考',
  },
  {
    value: 'Option1-2',
    label: '第二次月考',
  },
  {
    value: 'Option1-3',
    label: '第三次月考',
  },
  {
    value: 'Option1-4',
    label: '期中考试',
  },
  {
    value: 'Option1-5',
    label: '期末考试',
  },
]
const testdata2 = [
  {
    value: 'Option2-1',
    label: '语文',
  },
  {
    value: 'Option2-2',
    label: '数学',
  },
  {
    value: 'Option2-3',
    label: '英语',
  },
  {
    value: 'Option2-4',
    label: '物理',
  },
  {
    value: 'Option2-5',
    label: '历史',
  },
]

const testdata3 = {
  grade: [
    {
      subject: '数学1',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
    {
      subject: '数学2',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
    {
      subject: '数学3',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '撤销申请',
    },
    {
      subject: '数学4',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
    {
      subject: '数学5',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
    {
      subject: '数学6',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
    {
      subject: '数学7',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
    {
      subject: '数学8',
      name: '李哲',
      score: 150,
      rank: '1/1236',
      operation: '查分申请',
    },
  ],
  rank: { score: 700, rank1: 5, number: 1305 },
}
const testdata4 = {
  monthexam: [
    {
      name: '小一',
      score: 90,
    },
    {
      name: '小二',
      score: 86,
    },
    {
      name: '小三',
      score: 91,
    },
    {
      name: '小四',
      score: 89,
    },
    {
      name: '小五',
      score: 88,
    },
    {
      name: '小六',
      score: 95,
    },
  ],
  monthexam1: [
    {
      name: '小一1',
      score: 90,
    },
    {
      name: '小二1',
      score: 86,
    },
    {
      name: '小三1',
      score: 91,
    },
    {
      name: '小四1',
      score: 89,
    },
    {
      name: '小五1',
      score: 88,
    },
    {
      name: '小六1',
      score: 95,
    },
  ]
}
const testdata5 = {
  ondo: [
    {
      subject: '数学1',
      name: 'Tom',
      message: '成绩差距过大',
      exam:'期中考试',
    },
    {
      subject: '数学2',
      name: 'Tom',
      message: '成绩差距过大',
      exam:'期中考试',
    },
    {
      subject: '数学3',
      name: 'Tom',
      message: '成绩差距过大',
      exam:'期中考试',
    },
    {
      subject: '数学4',
      name: 'Tom',
      message: '成绩差距过大',
      exam:'期中考试',
    },
  ],
  done:
    [
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam:'期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam:'期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam:'期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam:'期中考试',
      },
    ]
}
const testdata6={
  subjectOptions: [
    {
      value: 'Option2-1',
      label: '语文',
    },
    {
      value: 'Option2-2',
      label: '数学',
    },
    {
      value: 'Option2-3',
      label: '英语',
    },
    {
      value: 'Option2-4',
      label: '物理',
    },
    {
      value: 'Option2-5',
      label: '历史',
    },
  ],
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username + password);

  // 在实际应用中，这里应该查询真实的用户数据库
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({
      status: 'success', message: 'Login successful', token: '123456789', name: '李哲111', email_msg: [{ msg: "王老师处理了你的查分申请，点击查看详情" },
      { msg: "黎老师处理了你的查分申请，点击查看详情" }]
    });
  } else {
    return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }
});
app.post('/api/exam_course', (req, res) => {
  console.log('Request Headers:');
  console.log(req.headers);
  const { exam, course } = req.body;
  console.log(exam + ' ' + course);
  return res.json(testdata3);
})
app.get('/api/exam', (req, res) => {
  console.log('Request Headers:');
  console.log(req.headers);
  return res.json(testdata1)
})
app.get('/api/course', (req, res) => {
  console.log('Request Headers:');
  //console.log(req.headers);
  return res.json(testdata2)
})
app.post('/api/class', (req, res) => {
  const{subject}=req.body
  console.log(subject)
  return res.json(testdata4)
})
app.get('/api/subject', (req, res) => {
  return res.json(testdata6)
})
app.get('/api/class1', (req, res) => {
  return res.json(testdata4)
})
app.post('/api/setting', (req, res) => {
  const { new_psd } = req.body;
  //console.log(new_psd+'helloksakka');
  return res.json();
})
app.post('/api/apply', (req, res) => {
  const { subject, name, exam, operation, msg } = req.body;
  console.log(subject + ' ' + name + ' ' + exam + ' ' + operation + ' ' + msg);
  return res.json({ msg: '查分申请成功' });
})
app.get('/api/applydata', (req, res) => {
  return res.json(testdata5)
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
