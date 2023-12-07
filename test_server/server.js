const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const multer = require('multer');
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
      operation: '撤销申请',
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
      exam: '期中考试',
    },
    {
      subject: '数学2',
      name: 'Tom',
      message: '成绩差距过大',
      exam: '期中考试',
    },
    {
      subject: '数学3',
      name: 'Tom',
      message: '成绩差距过大',
      exam: '期中考试',
    },
    {
      subject: '数学4',
      name: 'Tom',
      message: '成绩差距过大',
      exam: '期中考试',
    },
  ],
  done:
    [
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
    ]
}
const testdata6 = {
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
const testdata7 =
{
  class: [
    {
      value: 'Option1-1',
      label: '一班',
    },
    {
      value: 'Option1-2',
      label: '二班',
    },
    {
      value: 'Option1-3',
      label: '三班',
    },
    {
      value: 'Option1-4',
      label: '四班',
    },
    {
      value: 'Option1-5',
      label: '五班',
    },
  ],
  exam: [
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
  ],
}
const testdata8 = {
  inclassexam: [
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
  inclassexam1: [
    { name: '90-100分', value: 10 },
    { name: '80-90分', value: 12 },
    { name: '70-80分', value: 20 },
    { name: '60-70分', value: 15 },
    { name: '50-60分', value: 13 },
    { name: '40-50分', value: 12 },
    { name: '30-40分', value: 3 },
    { name: '20-30分', value: 2 },
    { name: '10-20分', value: 12 },
    { name: '0-10分', value: 5 },
  ],
}
const testdata9 = {
  examscore: [
    {
      name: '第一次月考',
      score: 90,
    },
    {
      name: '第二次月考',
      score: 86,
    },
    {
      name: '第三次月考',
      score: 91,
    },
    {
      name: '第四次月考',
      score: 89,
    },
    {
      name: '第五次月考',
      score: 88,
    },
    {
      name: '期中考试',
      score: 95,
    },
    {
      name: '期末考试',
      score: 98,
    },
  ],
  examsrank: [
    {
      name: '第一次月考',
      rank: 10,
      rank1: 100,
    },
    {
      name: '第二次月考',
      rank: 12,
      rank1: 120,
    },
    {
      name: '第三次月考',
      rank: 20,
      rank1: 200,
    },
    {
      name: '第四次月考',
      rank: 15,
      rank1: 150,
    },
    {
      name: '第五次月考',
      rank: 13,
      rank1: 130,
    },
    {
      name: '期中考试',
      rank: 12,
      rank1: 120,
    },
    {
      name: '期末考试',
      rank: 3,
      rank1: 3,
    },
  ],
}
const testdataA = [
  {
    id: 0,
    exam: '语文',
    name: '大傻',
    score: '10',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 1,
    exam: '数学',
    name: '大傻',
    score: '20',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 2,
    exam: '英语',
    name: '大傻',
    score: '30',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 3,
    exam: '物理',
    name: '大傻',
    score: '11',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 4,
    exam: '化学',
    name: '大傻',
    score: '12',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 5,
    exam: '生物',
    name: '大傻',
    score: '13',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 6,
    exam: '地理',
    name: '大傻',
    score: '11',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 7,
    exam: '历史',
    name: '大傻',
    score: '12',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 8,
    exam: '政治',
    name: '大傻',
    score: '13',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 9,
    exam: '体育',
    name: '大傻',
    score: '80',
    ack: '否',
    more: '就会这一个了',
    sid: '12345678910'
  },
  {
    id: 10,
    exam: '实验',
    name: '大傻',
    score: '10',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
  {
    id: 11,
    exam: '综合素质',
    name: '大傻',
    score: '8',
    ack: '是',
    more: '傻子一个，想捞分',
    sid: '12345678910'
  },
]
const testdataB = {
  examscore: [
    {
      name: '第一次月考',
      score: 90,
    },
    {
      name: '第二次月考',
      score: 86,
    },
    {
      name: '第三次月考',
      score: 91,
    },
    {
      name: '第四次月考',
      score: 89,
    },
    {
      name: '第五次月考',
      score: 88,
    },
    {
      name: '期中考试',
      score: 95,
    },
    {
      name: '期末考试',
      score: 98,
    },
  ],
  examsrank: [
    {
      name: '第一次月考',
      rank: 10
    },
    {
      name: '第二次月考',
      rank: 12
    },
    {
      name: '第三次月考',
      rank: 20
    },
    {
      name: '第四次月考',
      rank: 15
    },
    {
      name: '第五次月考',
      rank: 13
    },
    {
      name: '期中考试',
      rank: 12
    },
    {
      name: '期末考试',
      rank: 3
    },
  ],
}
const testdataC = {
  exam: [
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
  ],
}
const testdataD = {
  ondo: [
    {
      subject: '数学1',
      name: 'Tom',
      message: '成绩差距过大',
      exam: '期中考试',
    },
    {
      subject: '数学2',
      name: 'Tom',
      message: '成绩差距过大',
      exam: '期中考试',
    },
    {
      subject: '数学3',
      name: 'Tom',
      message: '成绩差距过大',
      exam: '期末考试',
    },
    {
      subject: '数学4',
      name: 'Jane',
      message: '成绩差距过大',
      exam: '期末考试',
    },
  ],
  done:
    [
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
      {
        subject: '数学d',
        name: 'Tom',
        message: '成绩差距过大',
        exam: '期中考试',
      },
    ]
}
const testdataE = {
  grade: [
    {
      subject: '数学1',
      name: '李哲',
      score: 150,
      exam:'期末考试',
     
    },
    {
      subject: '数学2',
      name: '李哲',
      score: 150,
      exam:'期中考试',
     
    },
    {
      subject: '数学3',
      name: '李哲',
      score: 150,
      exam:'七校考试',
      
    },
    {
      subject: '数学4',
      name: '李哲',
      score: 150,
      exam:'期末考试',
     
    },
    {
      subject: '数学5',
      name: '李哲',
      score: 150,
      exam:'期末考试',
     
    },
    {
      subject: '数学6',
      name: '李哲',
      score: 150,
      exam:'期末考试',
     
    },
    {
      subject: '数学7',
      name: '李哲',
      score: 150,
      exam:'期末考试',
     
    },
    {
      subject: '数学8',
      name: '李哲',
      score: 150,
      exam:'期末考试',
      
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
  //const user = users.find(u => u.username === username && u.password === password);

  if (username.length === 6) {
    return res.status(200).json({
      status: 'success', message: 'Login successful', token: '123456', name: '李哲111', email_msg: [{ msg: "王老师处理了你的查分申请，点击查看详情" },
      { msg: "黎老师处理了你的查分申请，点击查看详情" }]
    });
  } else if (username.length === 10) {
    return res.status(200).json({
      status: 'success', message: 'Login successful', token: '1234567890', name: '李哲111', email_msg: [{ msg: "王老师处理了你的查分申请，点击查看详情" },
      { msg: "黎老师处理了你的查分申请，点击查看详情" }]
    });
  }
  else {
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
  const { subject } = req.body
  console.log(subject)
  return res.json(testdata4)
})
app.post('/api/change', (req, res) => {
  const { subject,name,new_score,Stu,exam } = req.body
  console.log(subject+name+new_score+Stu+exam )
  return res.json()
})
app.post('/api/changedata', (req, res) => {
  const { Stu } = req.body
  console.log('Stu:'+Stu)
  return res.json(testdataE)
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
app.post('/api/deal', (req, res) => {
  const { subject, exam, operation, msg,name } = req.body;
  console.log(subject + ' '+name + ' ' + exam + ' ' + operation + ' ' + msg);
  return res.json({ msg: '处理申请成功' });
})
app.get('/api/applydata', (req, res) => {
  return res.json(testdata5)
})
app.get('/api/dealdata', (req, res) => {
  return res.json(testdataD)
})
app.post('/api/watchstudent', (req, res) => {
  if (req) {
    //在此处检查数据，传给后端待查询学生学号sid，传回前端examscore：学生各次考试的名称及总成绩；examsrank：学生各次考试的名称及排名
    return res.json(testdata9)
  }
})
app.get('/api/watchclass', (req, res) => {
  return res.json(testdata7)
  //获取所有班级的名称
})
const testdataF = {
  inclassexam: [
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
  inclassexam1: [
    { name: '90-100分', value: 10 },
    { name: '80-90分', value: 12 },
    { name: '70-80分', value: 20 },
    { name: '60-70分', value: 15 },
    { name: '50-60分', value: 13 },
    { name: '40-50分', value: 12 },
    { name: '30-40分', value: 3 },
    { name: '20-30分', value: 2 },
    { name: '10-20分', value: 12 },
    { name: '0-10分', value: 5 },
  ],
}
app.post('/api/watchclass0', (req, res) => {
  if (req) {
    //在此处检查数据，传给后端选择的班级名称及选择的考试名称class和exam，传回前端inclassexam，和inclassexam1，分别指该班级所有学生的姓名与此次考试的考试成绩，该班的此次考试成绩的分段（可自行分成绩段，只要返回分段的名称（如“80-100分”）与处于该分段的人数即可）
    return res.json(testdataF)
  }
})
const testdata12 = {
  exam: [
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
  ],
}
app.post('/api/watchclass2', (req, res) => {
  if (req) {
    //传给后端选择的班级名称class，需要查询该班级所有的考试，并传给前端
    return res.json(testdata12)
  }
})
const testdata11 = [
  {
    name: '一班',
    score: 900,
  },
  {
    name: '二班',
    score: 860,
  },
  {
    name: '三班',
    score: 910,
  },
  {
    name: '四班',
    score: 890,
  },
  {
    name: '五班',
    score: 880,
  },
  {
    name: '小六',
    score: 95,
  },
]
app.post('/api/watchclass1', (req, res) => {
  if (req) {
    //在此处检查数据，传给后端选择的考试名称exam1，传回前端所有班级的名称与该次考试的平均成绩
    return res.json(testdata11)
  }
})

const testdata13 = {
  totalscore: [
    {
      name: '小一',
      score: 900,
    },
    {
      name: '小二',
      score: 860,
    },
    {
      name: '小三',
      score: 910,
    },
    {
      name: '小四',
      score: 890,
    },
    {
      name: '小五',
      score: 880,
    },
    {
      name: '小六',
      score: 950,
    },
  ],
  totalavgscore: [
    {
      name: '一班',
      score: 900,
    },
    {
      name: '二班',
      score: 860,
    },
    {
      name: '三班',
      score: 910,
    },
    {
      name: '四班',
      score: 890,
    },
    {
      name: '五班',
      score: 880,
    },
    {
      name: '六班',
      score: 950,
    },
  ],
}
app.post('/api/watchclass3', (req, res) => {
  if (req) {
    return res.json(testdata13)
  }
})
app.post('/api/update/updatenew', (req, res) => {
  console.log('响应到了')
  return res.json()
})
app.post('/api/updatechange0', (req, res) => {
  if (req) {
    //在此处检查数据，传给后端学生学号sid，传给前端该学生的某些信息
    return res.json(testdataA)
  }
})
app.post('/api/updatechange1', (req, res) => {
  if (req) {
    //在此处检查数据，传给后端标识符id与修改后成绩score，要求后端在数据库修改成绩，不需要传给前端数据
    return res.json('')
  }
})
app.post('/api/upload', (req, res) => {
  const { Stu,exam,score,subject } = req.body;
  console.log(Stu+' '+exam+' '+score+' '+subject);
  return res.json();
})
app.get('/api/download', (req, res) => {
  const filePath = './file/hello.xlsx'; // 替换为你的文件路径
  const FileName = '标准模板文件.xlsx';
  const encodedFileName = encodeURIComponent(FileName)
  // 使用 fs.stat 获取文件信息
  fs.stat(filePath, (err, stats) => {
      if (err) {
          return res.status(404).send('File not found');
      }

      // 设置响应头，告诉浏览器这是一个要下载的文件
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${encodedFileName}`);
      res.setHeader('Content-Length', stats.size);

      // 创建可读流
      const readStream = fs.createReadStream(filePath);

      // 将文件流通过管道传输到响应中
      readStream.pipe(res);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 设置文件保存的目录
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// 创建 Multer 实例
const upload = multer({ storage });

// 处理文件上传的路由
app.post('/api/uploadfile', upload.single('file'), (req, res) => {
  console.log('Request Headers!!!:');
  console.log(req.headers);
  // req.file 包含上传的文件信息
  console.log('hehe')
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // 可以在这里处理上传成功后的逻辑，比如返回文件路径或其他信息
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  res.json({ message: 'File uploaded successfully', filePath });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
