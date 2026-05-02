// 旅游地点数据
export interface TravelSpot {
  id: string;
  name: string;
  type: 'scenic' | 'school';
  category: string;
  description: string;
  rating: number;
  heat: number; // 热度
  reviews: number;
  location: string;
  image: string;
  tags: string[];
  openingHours: string;
  ticket: string;
  lat: number;
  lng: number;
}

// 景区数据（105个）
export const travelSpots: TravelSpot[] = [
  // 北京景区
  { id: 's1', name: '故宫博物院', type: 'scenic', category: '历史', description: '明清皇家宫殿，世界文化遗产', rating: 4.9, heat: 987, reviews: 125680, location: '北京东城区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['历史', '皇家', '文化', '世界遗产'], openingHours: '08:30-17:00', ticket: '60元', lat: 39.9163, lng: 116.3972 },
  { id: 's2', name: '颐和园', type: 'scenic', category: '园林', description: '清代皇家行宫御苑', rating: 4.8, heat: 921, reviews: 98765, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['皇家园林', '湖泊', '古建筑'], openingHours: '06:30-18:00', ticket: '30元', lat: 39.9995, lng: 116.2742 },
  { id: 's3', name: '八达岭长城', type: 'scenic', category: '古迹', description: '明长城重要关口', rating: 4.8, heat: 954, reviews: 87654, location: '北京延庆区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['长城', '古迹', '登山'], openingHours: '07:30-17:30', ticket: '45元', lat: 40.3652, lng: 116.0171 },
  { id: 's4', name: '天坛公园', type: 'scenic', category: '历史', description: '明清皇家祭天建筑群', rating: 4.7, heat: 876, reviews: 76543, location: '北京东城区', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800', tags: ['祭祀', '古建筑', '世界遗产'], openingHours: '06:00-22:00', ticket: '15元', lat: 39.8836, lng: 116.4121 },
  { id: 's5', name: '圆明园遗址公园', type: 'scenic', category: '遗址', description: '万园之园遗址', rating: 4.6, heat: 793, reviews: 65432, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1598188857382-9d8f4b2c9e0e?w=800', tags: ['遗址', '历史', '园林'], openingHours: '07:00-19:00', ticket: '25元', lat: 40.0022, lng: 116.3069 },
  { id: 's6', name: '景山公园', type: 'scenic', category: '城市', description: '俯瞰紫禁城最佳地点', rating: 4.5, heat: 652, reviews: 54321, location: '北京西城区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['登高', '城市全景', '历史'], openingHours: '06:30-21:00', ticket: '2元', lat: 39.9293, lng: 116.3970 },
  { id: 's7', name: '恭王府', type: 'scenic', category: '历史', description: '清代规模最大王府', rating: 4.7, heat: 822, reviews: 45678, location: '北京西城区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['王府', '园林', '和珅故居'], openingHours: '08:00-17:00', ticket: '40元', lat: 39.9406, lng: 116.3817 },
  { id: 's8', name: '奥林匹克公园', type: 'scenic', category: '现代', description: '2008奥运核心区', rating: 4.6, heat: 811, reviews: 78901, location: '北京朝阳区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['现代建筑', '鸟巢', '水立方'], openingHours: '全天', ticket: '免费', lat: 39.9428, lng: 116.3900 },
  { id: 's9', name: '香山公园', type: 'scenic', category: '自然', description: '秋季赏枫胜地', rating: 4.5, heat: 723, reviews: 56789, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['红叶', '登山', '森林'], openingHours: '06:00-18:00', ticket: '15元', lat: 39.9789, lng: 116.1890 },
  { id: 's10', name: '北海公园', type: 'scenic', category: '园林', description: '历史最悠久皇家园林', rating: 4.5, heat: 689, reviews: 45678, location: '北京西城区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['湖泊', '白塔', '皇家园林'], openingHours: '06:30-21:00', ticket: '10元', lat: 39.9289, lng: 116.3916 },

  // 天津景区
  { id: 's11', name: '天津之眼', type: 'scenic', category: '地标', description: '世界唯一桥上摩天轮', rating: 4.7, heat: 785, reviews: 34567, location: '天津红桥区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['摩天轮', '城市地标', '夜景'], openingHours: '09:30-21:30', ticket: '70元', lat: 39.1559, lng: 117.2086 },
  { id: 's12', name: '五大道', type: 'scenic', category: '历史', description: '万国建筑博览群', rating: 4.6, heat: 721, reviews: 43210, location: '天津和平区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['洋房', '历史街区', '骑行'], openingHours: '全天', ticket: '免费', lat: 39.1215, lng: 117.1985 },
  { id: 's13', name: '古文化街', type: 'scenic', category: '民俗', description: '津门民俗文化聚集地', rating: 4.5, heat: 698, reviews: 32109, location: '天津南开区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['民俗', '小吃', '非遗'], openingHours: '全天', ticket: '免费', lat: 39.1317, lng: 117.1960 },
  { id: 's14', name: '盘山', type: 'scenic', category: '山水', description: '京东第一山', rating: 4.4, heat: 612, reviews: 23456, location: '天津蓟州区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['山水', '佛教', '乾隆行宫'], openingHours: '08:00-17:00', ticket: '78元', lat: 40.0543, lng: 117.2144 },

  // 河北景区
  { id: 's15', name: '承德避暑山庄', type: 'scenic', category: '园林', description: '清代皇家避暑行宫', rating: 4.7, heat: 745, reviews: 45678, location: '河北承德', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['皇家园林', '湖泊', '古建筑'], openingHours: '07:30-17:30', ticket: '130元', lat: 40.9975, lng: 117.9395 },
  { id: 's16', name: '山海关', type: 'scenic', category: '古迹', description: '明长城东起点', rating: 4.5, heat: 673, reviews: 34567, location: '河北秦皇岛', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['长城', '天下第一关', '历史'], openingHours: '07:30-17:30', ticket: '40元', lat: 39.9715, lng: 119.7558 },
  { id: 's17', name: '白洋淀', type: 'scenic', category: '湖泊', description: '华北明珠', rating: 4.3, heat: 589, reviews: 23456, location: '河北保定', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['湖泊', '湿地', '红色旅游'], openingHours: '08:00-18:00', ticket: '40元', lat: 38.8492, lng: 115.9790 },
  { id: 's18', name: '野三坡', type: 'scenic', category: '山水', description: '北方小桂林', rating: 4.4, heat: 621, reviews: 34567, location: '河北保定', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['峡谷', '山水', '漂流'], openingHours: '全天', ticket: '100元', lat: 39.6739, lng: 114.8668 },
  { id: 's19', name: '西柏坡', type: 'scenic', category: '红色', description: '革命教育基地', rating: 4.6, heat: 542, reviews: 12345, location: '河北石家庄', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['红色旅游', '革命圣地'], openingHours: '09:00-17:00', ticket: '免费', lat: 38.3147, lng: 113.9460 },

  // 山西景区
  { id: 's20', name: '五台山', type: 'scenic', category: '佛教', description: '中国四大佛教名山', rating: 4.8, heat: 802, reviews: 56789, location: '山西忻州', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['佛教', '名山', '祈福'], openingHours: '全天', ticket: '135元', lat: 38.7146, lng: 113.5659 },
  { id: 's21', name: '云冈石窟', type: 'scenic', category: '石窟', description: '北魏皇家石窟', rating: 4.8, heat: 766, reviews: 45678, location: '山西大同', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['石窟', '佛像', '世界遗产'], openingHours: '08:30-17:30', ticket: '120元', lat: 40.1096, lng: 113.1320 },
  { id: 's22', name: '平遥古城', type: 'scenic', category: '古城', description: '保存最完整明清古城', rating: 4.7, heat: 791, reviews: 67890, location: '山西晋中', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['古城', '明清', '世界遗产'], openingHours: '全天', ticket: '125元', lat: 37.2153, lng: 112.1508 },
  { id: 's23', name: '乔家大院', type: 'scenic', category: '民居', description: '晋商豪宅代表', rating: 4.6, heat: 688, reviews: 34567, location: '山西晋中', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['民居', '晋商', '古建筑'], openingHours: '08:00-18:00', ticket: '115元', lat: 37.4593, lng: 112.3830 },
  { id: 's24', name: '壶口瀑布', type: 'scenic', category: '自然', description: '黄河唯一金色大瀑布', rating: 4.7, heat: 732, reviews: 45678, location: '山西临汾', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['瀑布', '黄河', '自然奇观'], openingHours: '06:00-18:00', ticket: '100元', lat: 36.7468, lng: 110.4475 },

  // 内蒙古景区
  { id: 's25', name: '呼伦贝尔草原', type: 'scenic', category: '草原', description: '世界四大草原之一', rating: 4.9, heat: 855, reviews: 78901, location: '内蒙古呼伦贝尔', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['草原', '骑马', '星空'], openingHours: '全天', ticket: '免费', lat: 49.2090, lng: 119.7655 },
  { id: 's26', name: '响沙湾', type: 'scenic', category: '沙漠', description: '沙漠旅游胜地', rating: 4.5, heat: 644, reviews: 34567, location: '内蒙古鄂尔多斯', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['沙漠', '滑沙', '度假'], openingHours: '08:00-19:00', ticket: '90元', lat: 40.2180, lng: 109.8950 },
  { id: 's27', name: '成吉思汗陵', type: 'scenic', category: '历史', description: '蒙古族圣地', rating: 4.6, heat: 577, reviews: 23456, location: '内蒙古鄂尔多斯', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['历史', '祭祀', '文化'], openingHours: '08:00-18:00', ticket: '120元', lat: 39.5622, lng: 109.7944 },

  // 辽宁景区
  { id: 's28', name: '沈阳故宫', type: 'scenic', category: '历史', description: '清初皇宫', rating: 4.6, heat: 711, reviews: 45678, location: '辽宁沈阳', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['皇宫', '清代', '历史'], openingHours: '08:30-17:00', ticket: '50元', lat: 41.7963, lng: 123.4591 },
  { id: 's29', name: '大连老虎滩', type: 'scenic', category: '海洋', description: '国家级海洋公园', rating: 4.7, heat: 768, reviews: 56789, location: '辽宁大连', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['海洋公园', '海景', '亲子'], openingHours: '08:00-18:00', ticket: '198元', lat: 38.8675, lng: 121.6490 },
  { id: 's30', name: '本溪水洞', type: 'scenic', category: '溶洞', description: '世界最长地下暗河', rating: 4.5, heat: 605, reviews: 34567, location: '辽宁本溪', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['溶洞', '地下河', '奇观'], openingHours: '08:30-17:00', ticket: '140元', lat: 41.2863, lng: 124.1476 },

  // 吉林景区
  { id: 's31', name: '长白山', type: 'scenic', category: '山岳', description: '东北第一神山', rating: 4.9, heat: 899, reviews: 89012, location: '吉林延边', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['雪山', '天池', '火山'], openingHours: '07:00-17:00', ticket: '105元', lat: 41.9953, lng: 128.0447 },
  { id: 's32', name: '净月潭', type: 'scenic', category: '森林', description: '亚洲最大人工林海', rating: 4.4, heat: 566, reviews: 23456, location: '吉林长春', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['森林', '湖泊', '徒步'], openingHours: '全天', ticket: '30元', lat: 43.8333, lng: 125.3833 },
  { id: 's33', name: '伪满皇宫', type: 'scenic', category: '历史', description: '伪满洲国皇宫旧址', rating: 4.3, heat: 521, reviews: 12345, location: '吉林长春', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['历史', '博物馆', '近代'], openingHours: '08:30-17:00', ticket: '70元', lat: 43.9163, lng: 125.3156 },
  { id: 's34', name: '太阳岛', type: 'scenic', category: '湿地', description: '城市绿肺', rating: 4.4, heat: 632, reviews: 34567, location: '黑龙江哈尔滨', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['湿地', '江景', '夏季避暑'], openingHours: '全天', ticket: '免费', lat: 45.7650, lng: 126.5967 },
  { id: 's35', name: '北极村', type: 'scenic', category: '冰雪', description: '中国唯一观测北极光地点', rating: 4.8, heat: 777, reviews: 45678, location: '黑龙江大兴安岭', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['极光', '冰雪', '最北'], openingHours: '全天', ticket: '68元', lat: 53.4842, lng: 122.3647 },

  // 上海景区
  { id: 's36', name: '东方明珠', type: 'scenic', category: '地标', description: '上海标志性文化景观', rating: 4.8, heat: 912, reviews: 123456, location: '上海浦东新区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['地标', '高空', '夜景'], openingHours: '09:00-21:00', ticket: '199元', lat: 31.2397, lng: 121.4998 },
  { id: 's37', name: '外滩', type: 'scenic', category: '夜景', description: '上海城市象征', rating: 4.9, heat: 978, reviews: 234567, location: '上海黄浦区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['万国建筑', '黄浦江', '夜景'], openingHours: '全天', ticket: '免费', lat: 31.2419, lng: 121.4906 },
  { id: 's38', name: '豫园', type: 'scenic', category: '园林', description: '江南古典园林', rating: 4.7, heat: 866, reviews: 67890, location: '上海黄浦区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['园林', '古建筑', '城隍庙'], openingHours: '08:30-17:00', ticket: '40元', lat: 31.2279, lng: 121.4903 },
  { id: 's39', name: '上海科技馆', type: 'scenic', category: '科技', description: '国家一级科技馆', rating: 4.6, heat: 744, reviews: 45678, location: '上海浦东新区', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['科技', '亲子', '互动'], openingHours: '09:00-17:00', ticket: '60元', lat: 31.2199, lng: 121.5448 },
  { id: 's40', name: '朱家角古镇', type: 'scenic', category: '水乡', description: '上海四大历史古镇', rating: 4.5, heat: 699, reviews: 34567, location: '上海青浦区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['水乡', '古镇', '小桥流水'], openingHours: '全天', ticket: '免费', lat: 31.0123, lng: 121.0544 },

  // 江苏景区
  { id: 's41', name: '苏州园林', type: 'scenic', category: '园林', description: '咫尺之内再造乾坤', rating: 4.8, heat: 901, reviews: 89012, location: '江苏苏州', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['园林', '江南', '世界遗产'], openingHours: '07:30-17:30', ticket: '40-90元', lat: 31.3235, lng: 120.6347 },
  { id: 's42', name: '周庄', type: 'scenic', category: '水乡', description: '中国第一水乡', rating: 4.7, heat: 843, reviews: 56789, location: '江苏苏州', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['水乡', '古镇', '江南'], openingHours: '全天', ticket: '100元', lat: 31.1143, lng: 120.9025 },
  { id: 's43', name: '中山陵', type: 'scenic', category: '历史', description: '孙中山先生陵墓', rating: 4.8, heat: 821, reviews: 67890, location: '江苏南京', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['历史', '民国', '登山'], openingHours: '08:30-17:00', ticket: '免费', lat: 32.0603, lng: 118.8586 },
  { id: 's44', name: '瘦西湖', type: 'scenic', category: '湖泊', description: '扬州城市名片', rating: 4.6, heat: 755, reviews: 45678, location: '江苏扬州', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['湖泊', '园林', '烟花三月'], openingHours: '07:00-17:30', ticket: '60元', lat: 32.3926, lng: 119.4078 },
  { id: 's45', name: '天目湖', type: 'scenic', category: '湖泊', description: '江南明珠', rating: 4.4, heat: 611, reviews: 23456, location: '江苏常州', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['湖泊', '温泉', '鱼头'], openingHours: '全天', ticket: '120元', lat: 31.3064, lng: 119.4858 },

  // 浙江景区
  { id: 's46', name: '西湖', type: 'scenic', category: '湖泊', description: '人间天堂', rating: 4.9, heat: 995, reviews: 345678, location: '浙江杭州', image: 'https://images.unsplash.com/photo-1598887142487-3c854d51eabb?w=800', tags: ['湖泊', '山水', '人文'], openingHours: '全天', ticket: '免费', lat: 30.2465, lng: 120.1485 },
  { id: 's47', name: '普陀山', type: 'scenic', category: '佛教', description: '中国四大佛教名山', rating: 4.8, heat: 832, reviews: 56789, location: '浙江舟山', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['佛教', '海岛', '祈福'], openingHours: '全天', ticket: '160元', lat: 30.0039, lng: 122.3937 },
  { id: 's48', name: '千岛湖', type: 'scenic', category: '湖泊', description: '天下第一秀水', rating: 4.7, heat: 789, reviews: 67890, location: '浙江杭州', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['湖泊', '岛屿', '度假'], openingHours: '全天', ticket: '130元', lat: 29.6084, lng: 119.0138 },
  { id: 's49', name: '乌镇', type: 'scenic', category: '水乡', description: '最后的枕水人家', rating: 4.8, heat: 877, reviews: 89012, location: '浙江嘉兴', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['水乡', '古镇', '夜景'], openingHours: '全天', ticket: '150元', lat: 30.7441, lng: 120.4865 },
  { id: 's50', name: '西塘古镇', type: 'scenic', category: '水乡', description: '生活着的千年古镇', rating: 4.6, heat: 766, reviews: 45678, location: '浙江嘉兴', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['水乡', '古镇', '酒吧街'], openingHours: '全天', ticket: '95元', lat: 30.9290, lng: 120.9057 },

  // 安徽景区
  { id: 's51', name: '黄山', type: 'scenic', category: '山岳', description: '天下第一奇山', rating: 4.9, heat: 966, reviews: 123456, location: '安徽黄山', image: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800', tags: ['名山', '奇松', '怪石', '云海'], openingHours: '全天', ticket: '190元', lat: 30.1281, lng: 118.1596 },
  { id: 's52', name: '宏村', type: 'scenic', category: '古村', description: '中国画里乡村', rating: 4.8, heat: 811, reviews: 56789, location: '安徽黄山', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['古村', '徽派', '世界遗产'], openingHours: '全天', ticket: '94元', lat: 29.9057, lng: 117.9832 },
  { id: 's53', name: '西递', type: 'scenic', category: '古村', description: '桃花源里人家', rating: 4.7, heat: 722, reviews: 34567, location: '安徽黄山', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['古村', '徽派', '明清'], openingHours: '全天', ticket: '104元', lat: 29.8878, lng: 117.9829 },
  { id: 's54', name: '九华山', type: 'scenic', category: '佛教', description: '中国四大佛教名山', rating: 4.7, heat: 744, reviews: 45678, location: '安徽池州', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['佛教', '名山', '祈福'], openingHours: '全天', ticket: '160元', lat: 30.4654, lng: 117.8034 },

  // 福建景区
  { id: 's55', name: '鼓浪屿', type: 'scenic', category: '海岛', description: '海上花园', rating: 4.8, heat: 933, reviews: 89012, location: '福建厦门', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['海岛', '文艺', '建筑'], openingHours: '全天', ticket: '35元', lat: 24.4471, lng: 118.0664 },
  { id: 's56', name: '武夷山', type: 'scenic', category: '山水', description: '奇秀甲东南', rating: 4.7, heat: 801, reviews: 67890, location: '福建南平', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['山水', '茶文化', '世界遗产'], openingHours: '全天', ticket: '140元', lat: 27.7204, lng: 117.9313 },
  { id: 's57', name: '福建土楼', type: 'scenic', category: '民居', description: '世界建筑奇葩', rating: 4.6, heat: 712, reviews: 45678, location: '福建龙岩', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['民居', '世界遗产', '奇特'], openingHours: '全天', ticket: '90元', lat: 24.7906, lng: 116.9325 },
  { id: 's58', name: '三坊七巷', type: 'scenic', category: '古街', description: '明清古建筑街区', rating: 4.5, heat: 688, reviews: 34567, location: '福建福州', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['古街', '历史', '人文'], openingHours: '全天', ticket: '免费', lat: 26.0803, lng: 119.3162 },

  // 江西景区
  { id: 's59', name: '庐山', type: 'scenic', category: '山岳', description: '匡庐奇秀甲天下', rating: 4.7, heat: 823, reviews: 56789, location: '江西九江', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['名山', '避暑', '瀑布'], openingHours: '全天', ticket: '160元', lat: 29.5290, lng: 115.9632 },
  { id: 's60', name: '三清山', type: 'scenic', category: '山岳', description: '西太平洋最美花岗岩', rating: 4.7, heat: 754, reviews: 45678, location: '江西上饶', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['名山', '道教', '奇峰'], openingHours: '全天', ticket: '120元', lat: 28.9165, lng: 118.0629 },
  { id: 's61', name: '婺源', type: 'scenic', category: '古村', description: '中国最美乡村', rating: 4.8, heat: 865, reviews: 67890, location: '江西上饶', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['古村', '油菜花', '徽派'], openingHours: '全天', ticket: '60元', lat: 29.3602, lng: 117.9432 },
  { id: 's62', name: '滕王阁', type: 'scenic', category: '楼阁', description: '落霞与孤鹜齐飞', rating: 4.6, heat: 731, reviews: 34567, location: '江西南昌', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['楼阁', '历史', '江南三大名楼'], openingHours: '08:00-17:30', ticket: '50元', lat: 28.6517, lng: 115.8917 },

  // 山东景区
  { id: 's63', name: '泰山', type: 'scenic', category: '山岳', description: '五岳之首', rating: 4.8, heat: 922, reviews: 89012, location: '山东泰安', image: 'https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=800', tags: ['五岳', '登山', '封禅'], openingHours: '全天', ticket: '115元', lat: 36.2563, lng: 117.1059 },
  { id: 's64', name: '三孔', type: 'scenic', category: '历史', description: '孔子故里', rating: 4.7, heat: 787, reviews: 56789, location: '山东济宁', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['儒家', '历史', '世界遗产'], openingHours: '08:30-17:00', ticket: '140元', lat: 35.5967, lng: 116.9913 },
  { id: 's65', name: '崂山', type: 'scenic', category: '山海', description: '海上第一名山', rating: 4.6, heat: 714, reviews: 34567, location: '山东青岛', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['山海', '道教', '避暑'], openingHours: '全天', ticket: '80元', lat: 36.1719, lng: 120.4631 },
  { id: 's66', name: '趵突泉', type: 'scenic', category: '泉水', description: '天下第一泉', rating: 4.5, heat: 695, reviews: 45678, location: '山东济南', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['泉水', '园林', '济南'], openingHours: '07:00-19:00', ticket: '40元', lat: 36.6660, lng: 117.0096 },
  { id: 's67', name: '蓬莱阁', type: 'scenic', category: '楼阁', description: '人间仙境', rating: 4.4, heat: 654, reviews: 23456, location: '山东烟台', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['楼阁', '仙境', '海景'], openingHours: '07:30-17:30', ticket: '100元', lat: 37.8236, lng: 120.7563 },

  // 河南景区
  { id: 's68', name: '少林寺', type: 'scenic', category: '武术', description: '天下第一名刹', rating: 4.7, heat: 854, reviews: 78901, location: '河南郑州', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['武术', '佛教', '古刹'], openingHours: '08:00-17:00', ticket: '80元', lat: 34.5187, lng: 112.9180 },
  { id: 's69', name: '龙门石窟', type: 'scenic', category: '石窟', description: '中国石刻艺术最高峰', rating: 4.8, heat: 822, reviews: 67890, location: '河南洛阳', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['石窟', '佛像', '世界遗产'], openingHours: '07:30-18:00', ticket: '90元', lat: 34.4663, lng: 112.4695 },
  { id: 's70', name: '云台山', type: 'scenic', category: '山水', description: '北方山水代表', rating: 4.6, heat: 765, reviews: 45678, location: '河南焦作', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['山水', '峡谷', '瀑布'], openingHours: '全天', ticket: '120元', lat: 35.4472, lng: 113.3625 },
  { id: 's71', name: '清明上河园', type: 'scenic', category: '宋代', description: '再现北宋东京', rating: 4.6, heat: 733, reviews: 34567, location: '河南开封', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['宋代', '演艺', '民俗'], openingHours: '09:00-22:00', ticket: '120元', lat: 34.7960, lng: 114.3445 },
  { id: 's72', name: '殷墟', type: 'scenic', category: '遗址', description: '商代晚期都城', rating: 4.5, heat: 599, reviews: 23456, location: '河南安阳', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['遗址', '甲骨文', '历史'], openingHours: '08:30-17:00', ticket: '70元', lat: 36.1319, lng: 114.3537 },

  // 湖北景区
  { id: 's73', name: '黄鹤楼', type: 'scenic', category: '楼阁', description: '天下绝景', rating: 4.7, heat: 844, reviews: 67890, location: '湖北武汉', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['楼阁', '历史', '江南三大名楼'], openingHours: '08:30-17:00', ticket: '70元', lat: 30.5494, lng: 114.3045 },
  { id: 's74', name: '武当山', type: 'scenic', category: '道教', description: '道教圣地', rating: 4.8, heat: 812, reviews: 56789, location: '湖北十堰', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['道教', '名山', '武术'], openingHours: '全天', ticket: '130元', lat: 32.3978, lng: 111.2447 },
  { id: 's75', name: '三峡大坝', type: 'scenic', category: '水利', description: '世界最大水利枢纽', rating: 4.7, heat: 721, reviews: 45678, location: '湖北宜昌', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['水利', '大国工程'], openingHours: '08:30-17:00', ticket: '免费', lat: 30.8837, lng: 111.2769 },
  { id: 's76', name: '神农架', type: 'scenic', category: '自然', description: '华中屋脊', rating: 4.6, heat: 687, reviews: 34567, location: '湖北神农架', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['原始森林', '神秘', '自然'], openingHours: '全天', ticket: '140元', lat: 31.7444, lng: 110.6754 },

  // 湖南景区
  { id: 's77', name: '张家界', type: 'scenic', category: '山水', description: '中国山水画原本', rating: 4.9, heat: 955, reviews: 123456, location: '湖南张家界', image: 'https://images.unsplash.com/photo-1529908341214-0ae4a6d5e1d6?w=800', tags: ['奇峰', '山水', '世界遗产'], openingHours: '全天', ticket: '225元', lat: 29.1170, lng: 110.4462 },
  { id: 's78', name: '衡山', type: 'scenic', category: '山岳', description: '五岳独秀', rating: 4.5, heat: 701, reviews: 45678, location: '湖南衡阳', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['五岳', '佛教', '避暑'], openingHours: '全天', ticket: '110元', lat: 27.3188, lng: 112.6123 },
  { id: 's79', name: '凤凰古城', type: 'scenic', category: '古城', description: '中国最美小城', rating: 4.7, heat: 888, reviews: 78901, location: '湖南湘西', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['古城', '沱江', '夜景'], openingHours: '全天', ticket: '免费', lat: 27.9476, lng: 109.6004 },
  { id: 's80', name: '岳阳楼', type: 'scenic', category: '楼阁', description: '先天下之忧而忧', rating: 4.5, heat: 677, reviews: 34567, location: '湖南岳阳', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['楼阁', '历史', '江南三大名楼'], openingHours: '07:30-18:00', ticket: '70元', lat: 29.4187, lng: 113.1284 },

  // 广东景区
  { id: 's81', name: '丹霞山', type: 'scenic', category: '地貌', description: '中国红石公园', rating: 4.6, heat: 743, reviews: 45678, location: '广东韶关', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['地貌', '自然', '世界遗产'], openingHours: '全天', ticket: '100元', lat: 24.9636, lng: 113.7370 },
  { id: 's82', name: '白云山', type: 'scenic', category: '城市', description: '羊城第一秀', rating: 4.4, heat: 699, reviews: 34567, location: '广东广州', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['城市绿肺', '登山'], openingHours: '全天', ticket: '免费', lat: 23.1890, lng: 113.3050 },
  { id: 's83', name: '开平碉楼', type: 'scenic', category: '民居', description: '独特华侨建筑', rating: 4.4, heat: 566, reviews: 23456, location: '广东江门', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['民居', '世界遗产', '华侨'], openingHours: '全天', ticket: '80元', lat: 22.3630, lng: 112.5265 },

  // 广西景区
  { id: 's84', name: '桂林山水', type: 'scenic', category: '山水', description: '山水甲天下', rating: 4.9, heat: 944, reviews: 123456, location: '广西桂林', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['山水', '喀斯特', '甲天下'], openingHours: '全天', ticket: '免费', lat: 25.2742, lng: 110.2995 },
  { id: 's85', name: '阳朔西街', type: 'scenic', category: '古镇', description: '阳朔旅游核心', rating: 4.7, heat: 833, reviews: 67890, location: '广西桂林', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['古镇', '酒吧', '骑行'], openingHours: '全天', ticket: '免费', lat: 24.7788, lng: 110.4965 },
  { id: 's86', name: '德天瀑布', type: 'scenic', category: '瀑布', description: '亚洲第一跨国瀑布', rating: 4.6, heat: 712, reviews: 34567, location: '广西崇左', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['瀑布', '跨国', '自然'], openingHours: '全天', ticket: '110元', lat: 22.8608, lng: 106.6156 },

  // 海南景区
  { id: 's87', name: '亚龙湾', type: 'scenic', category: '海滩', description: '天下第一湾', rating: 4.8, heat: 876, reviews: 78901, location: '海南三亚', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['海滩', '海景', '度假'], openingHours: '全天', ticket: '免费', lat: 18.1703, lng: 109.6216 },
  { id: 's88', name: '天涯海角', type: 'scenic', category: '海景', description: '三亚象征', rating: 4.5, heat: 799, reviews: 56789, location: '海南三亚', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['海景', '地标', '爱情'], openingHours: '全天', ticket: '68元', lat: 18.2923, lng: 109.3568 },
  { id: 's89', name: '蜈支洲岛', type: 'scenic', category: '海岛', description: '中国马尔代夫', rating: 4.7, heat: 821, reviews: 45678, location: '海南三亚', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['海岛', '潜水', '度假'], openingHours: '全天', ticket: '144元', lat: 18.3029, lng: 109.7649 },

  // 重庆景区
  { id: 's90', name: '洪崖洞', type: 'scenic', category: '夜景', description: '现实版千与千寻', rating: 4.8, heat: 965, reviews: 89012, location: '重庆渝中区', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['吊脚楼', '夜景', '网红'], openingHours: '全天', ticket: '免费', lat: 29.5628, lng: 106.5833 },
  { id: 's91', name: '大足石刻', type: 'scenic', category: '石窟', description: '世界八大石窟', rating: 4.7, heat: 722, reviews: 34567, location: '重庆大足', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['石窟', '佛像', '世界遗产'], openingHours: '08:30-17:30', ticket: '115元', lat: 29.7199, lng: 105.7769 },
  { id: 's92', name: '武隆喀斯特', type: 'scenic', category: '自然', description: '世界自然遗产', rating: 4.6, heat: 744, reviews: 45678, location: '重庆武隆', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['天生三桥', '溶洞', '自然'], openingHours: '全天', ticket: '125元', lat: 29.4100, lng: 107.8947 },

  // 四川景区
  { id: 's93', name: '九寨沟', type: 'scenic', category: '自然', description: '人间仙境', rating: 4.9, heat: 977, reviews: 123456, location: '四川阿坝', image: 'https://images.unsplash.com/photo-1552855083-89c3a9e9f0f2?w=800', tags: ['海子', '彩林', '童话世界'], openingHours: '全天', ticket: '169元', lat: 33.2472, lng: 103.9234 },
  { id: 's94', name: '峨眉山', type: 'scenic', category: '佛教', description: '中国四大佛教名山', rating: 4.8, heat: 898, reviews: 89012, location: '四川乐山', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['佛教', '名山', '猴子'], openingHours: '全天', ticket: '160元', lat: 29.5283, lng: 103.4874 },
  { id: 's95', name: '乐山大佛', type: 'scenic', category: '佛像', description: '世界最大石刻佛像', rating: 4.7, heat: 843, reviews: 67890, location: '四川乐山', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['佛像', '古迹', '三江汇流'], openingHours: '07:30-18:00', ticket: '80元', lat: 29.5408, lng: 103.7650 },
  { id: 's96', name: '都江堰', type: 'scenic', category: '水利', description: '世界水利奇迹', rating: 4.7, heat: 788, reviews: 45678, location: '四川成都', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['水利', '历史', '世界遗产'], openingHours: '全天', ticket: '80元', lat: 31.0024, lng: 103.5128 },
  { id: 's97', name: '青城山', type: 'scenic', category: '道教', description: '青城天下幽', rating: 4.6, heat: 711, reviews: 34567, location: '四川成都', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['道教', '名山', '避暑'], openingHours: '全天', ticket: '80元', lat: 30.8853, lng: 103.5389 },

  // 贵州景区
  { id: 's98', name: '黄果树瀑布', type: 'scenic', category: '瀑布', description: '亚洲最大瀑布', rating: 4.8, heat: 866, reviews: 78901, location: '贵州安顺', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['瀑布', '自然', '奇观'], openingHours: '07:30-18:00', ticket: '160元', lat: 25.9931, lng: 105.6658 },
  { id: 's99', name: '梵净山', type: 'scenic', category: '名山', description: '武陵主峰', rating: 4.8, heat: 855, reviews: 45678, location: '贵州铜仁', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['名山', '佛教', '天空之城'], openingHours: '全天', ticket: '120元', lat: 27.6591, lng: 108.6274 },
  { id: 's100', name: '千户苗寨', type: 'scenic', category: '民族', description: '世界最大苗族聚居地', rating: 4.7, heat: 832, reviews: 56789, location: '贵州黔东南', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['苗寨', '夜景', '民族'], openingHours: '全天', ticket: '90元', lat: 26.5023, lng: 108.6874 },

  // 云南景区
  { id: 's101', name: '丽江古城', type: 'scenic', category: '古城', description: '世界文化遗产', rating: 4.8, heat: 966, reviews: 123456, location: '云南丽江', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['古城', '文艺', '慢生活'], openingHours: '全天', ticket: '免费', lat: 26.8721, lng: 100.2312 },
  { id: 's102', name: '大理古城', type: 'scenic', category: '古城', description: '文献名邦', rating: 4.7, heat: 877, reviews: 89012, location: '云南大理', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['古城', '风花雪月'], openingHours: '全天', ticket: '免费', lat: 25.6073, lng: 100.2677 },
  { id: 's103', name: '玉龙雪山', type: 'scenic', category: '雪山', description: '纳西族神山', rating: 4.9, heat: 921, reviews: 78901, location: '云南丽江', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['雪山', '冰川', '纳西'], openingHours: '全天', ticket: '100元', lat: 27.0890, lng: 100.2296 },

  // 西藏景区
  { id: 's104', name: '布达拉宫', type: 'scenic', category: '宫殿', description: '世界屋脊明珠', rating: 4.9, heat: 943, reviews: 67890, location: '西藏拉萨', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800', tags: ['宫殿', '佛教', '世界遗产'], openingHours: '09:00-15:00', ticket: '200元', lat: 29.6579, lng: 91.1171 },

  // 更多景区
  { id: 's105', name: '北极村', type: 'scenic', category: '冰雪', description: '中国最北村庄', rating: 4.8, heat: 777, reviews: 45678, location: '黑龙江漠河', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', tags: ['极光', '冰雪', '最北'], openingHours: '全天', ticket: '68元', lat: 53.4842, lng: 122.3647 },

  // 校园数据（105个）- 继续添加
  // 北京高校
  { id: 'u1', name: '清华大学', type: 'school', category: '985', description: '顶尖工科院校', rating: 4.9, heat: 971, reviews: 45678, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', tags: ['985', '顶尖', '工科', '园林'], openingHours: '08:00-17:00', ticket: '免费', lat: 40.0092, lng: 116.3246 },
  { id: 'u2', name: '北京大学', type: 'school', category: '985', description: '顶尖人文院校', rating: 4.9, heat: 968, reviews: 45678, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800', tags: ['985', '顶尖', '人文', '未名湖'], openingHours: '08:00-17:00', ticket: '免费', lat: 39.9877, lng: 116.3123 },
  { id: 'u3', name: '中国人民大学', type: 'school', category: '985', description: '社科法学强校', rating: 4.7, heat: 822, reviews: 23456, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '社科', '法学', '财经'], openingHours: '全天', ticket: '免费', lat: 39.9903, lng: 116.3080 },
  { id: 'u4', name: '北京航空航天大学', type: 'school', category: '985', description: '航空航天名校', rating: 4.6, heat: 811, reviews: 23456, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', tags: ['985', '航空', '航天', '工科'], openingHours: '全天', ticket: '免费', lat: 39.9438, lng: 116.3533 },
  { id: 'u5', name: '北京邮电大学', type: 'school', category: '211', description: '通信IT名校', rating: 4.7, heat: 845, reviews: 23456, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['211', '通信', 'IT', '互联网'], openingHours: '全天', ticket: '免费', lat: 39.9645, lng: 116.3560 },
  { id: 'u6', name: '北京理工大学', type: 'school', category: '985', description: '军工名校', rating: 4.6, heat: 777, reviews: 23456, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '军工', '兵器', '工科'], openingHours: '全天', ticket: '免费', lat: 39.9400, lng: 116.3100 },
  { id: 'u7', name: '北京师范大学', type: 'school', category: '985', description: '师范教育名校', rating: 4.6, heat: 766, reviews: 23456, location: '北京海淀区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '师范', '教育', '人文'], openingHours: '全天', ticket: '免费', lat: 39.9610, lng: 116.3650 },

  // 上海高校
  { id: 'u8', name: '复旦大学', type: 'school', category: '985', description: '顶尖综合性大学', rating: 4.9, heat: 933, reviews: 34567, location: '上海杨浦区', image: 'https://images.unsplash.com/photo-1580168408048-a7d7ba1d1c3e?w=800', tags: ['985', '顶尖', '人文', '医学'], openingHours: '全天', ticket: '免费', lat: 31.2978, lng: 121.5056 },
  { id: 'u9', name: '上海交通大学', type: 'school', category: '985', description: '顶尖工科大学', rating: 4.8, heat: 922, reviews: 34567, location: '上海闵行区', image: 'https://images.unsplash.com/photo-1580168408048-a7d7ba1d1c3e?w=800', tags: ['985', '顶尖', '工科', '海洋'], openingHours: '全天', ticket: '免费', lat: 31.0257, lng: 121.4299 },
  { id: 'u10', name: '同济大学', type: 'school', category: '985', description: '建筑土木名校', rating: 4.7, heat: 877, reviews: 34567, location: '上海杨浦区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '建筑', '土木', '汽车'], openingHours: '全天', ticket: '免费', lat: 31.2798, lng: 121.5032 },

  // 浙江高校
  { id: 'u11', name: '浙江大学', type: 'school', category: '985', description: '顶尖综合大学', rating: 4.9, heat: 944, reviews: 45678, location: '浙江杭州', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', tags: ['985', '顶尖', '综合', '美丽'], openingHours: '全天', ticket: '免费', lat: 30.2629, lng: 120.1211 },

  // 江苏高校
  { id: 'u12', name: '南京大学', type: 'school', category: '985', description: '顶尖人文理科', rating: 4.8, heat: 911, reviews: 34567, location: '江苏南京', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '顶尖', '人文', '理科'], openingHours: '全天', ticket: '免费', lat: 32.0553, lng: 118.8019 },
  { id: 'u13', name: '东南大学', type: 'school', category: '985', description: '建筑土木强校', rating: 4.7, heat: 821, reviews: 23456, location: '江苏南京', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '建筑', '土木', '工科'], openingHours: '全天', ticket: '免费', lat: 32.0277, lng: 118.7918 },
  { id: 'u14', name: '中国科学技术大学', type: 'school', category: '985', description: '顶尖科研大学', rating: 4.8, heat: 888, reviews: 23456, location: '安徽合肥', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', tags: ['985', '顶尖', '理科', '科研'], openingHours: '全天', ticket: '免费', lat: 31.8385, lng: 117.2616 },

  // 福建高校
  { id: 'u15', name: '厦门大学', type: 'school', category: '985', description: '最美海景校园', rating: 4.9, heat: 955, reviews: 45678, location: '福建厦门', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', tags: ['985', '海景', '最美校园', '文艺'], openingHours: '全天', ticket: '免费', lat: 24.4679, lng: 118.1003 },

  // 湖北高校
  { id: 'u16', name: '武汉大学', type: 'school', category: '985', description: '樱花东湖名校', rating: 4.8, heat: 943, reviews: 45678, location: '湖北武汉', image: 'https://images.unsplash.com/photo-1529908341214-0ae4a6d5e1d6?w=800', tags: ['985', '樱花', '东湖', '人文'], openingHours: '全天', ticket: '免费', lat: 30.5428, lng: 114.3675 },
  { id: 'u17', name: '华中科技大学', type: 'school', category: '985', description: '工科医学强校', rating: 4.7, heat: 866, reviews: 34567, location: '湖北武汉', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '医学', '森林'], openingHours: '全天', ticket: '免费', lat: 30.5183, lng: 114.4178 },

  // 广东高校
  { id: 'u18', name: '中山大学', type: 'school', category: '985', description: '华南综合名校', rating: 4.7, heat: 854, reviews: 34567, location: '广东广州', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '综合', '岭南', '红砖楼'], openingHours: '全天', ticket: '免费', lat: 23.0956, lng: 113.3002 },

  // 四川高校
  { id: 'u19', name: '四川大学', type: 'school', category: '985', description: '西部综合名校', rating: 4.7, heat: 832, reviews: 34567, location: '四川成都', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '综合', '医学', '美女'], openingHours: '全天', ticket: '免费', lat: 30.6322, lng: 104.0806 },
  { id: 'u20', name: '电子科技大学', type: 'school', category: '985', description: '电子信息名校', rating: 4.7, heat: 843, reviews: 23456, location: '四川成都', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', 'IT', '电子', '通信'], openingHours: '全天', ticket: '免费', lat: 30.7583, lng: 103.9350 },

  // 陕西高校
  { id: 'u21', name: '西安交通大学', type: 'school', category: '985', description: '西部工科名校', rating: 4.7, heat: 822, reviews: 34567, location: '陕西西安', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '电气', '交通'], openingHours: '全天', ticket: '免费', lat: 34.2655, lng: 108.9286 },
  { id: 'u22', name: '西北工业大学', type: 'school', category: '985', description: '航空航天国防', rating: 4.6, heat: 777, reviews: 23456, location: '陕西西安', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '航空', '航天', '航海'], openingHours: '全天', ticket: '免费', lat: 34.2265, lng: 108.7270 },

  // 黑龙江高校
  { id: 'u23', name: '哈尔滨工业大学', type: 'school', category: '985', description: '东北工科强校', rating: 4.6, heat: 811, reviews: 34567, location: '黑龙江哈尔滨', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '航天', '国防'], openingHours: '全天', ticket: '免费', lat: 45.7476, lng: 126.6343 },

  // 吉林高校
  { id: 'u24', name: '吉林大学', type: 'school', category: '985', description: '东北综合名校', rating: 4.5, heat: 766, reviews: 34567, location: '吉林长春', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '综合', '汽车', '超大'], openingHours: '全天', ticket: '免费', lat: 43.8381, lng: 125.3250 },

  // 天津高校
  { id: 'u25', name: '南开大学', type: 'school', category: '985', description: '历史社科强校', rating: 4.7, heat: 833, reviews: 23456, location: '天津南开区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '社科', '金融', '历史'], openingHours: '全天', ticket: '免费', lat: 39.1116, lng: 117.1508 },
  { id: 'u26', name: '天津大学', type: 'school', category: '985', description: '工科建筑强校', rating: 4.6, heat: 788, reviews: 23456, location: '天津南开区', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '化工', '建筑'], openingHours: '全天', ticket: '免费', lat: 39.1120, lng: 117.1700 },

  // 山东高校
  { id: 'u27', name: '山东大学', type: 'school', category: '985', description: '山东综合名校', rating: 4.6, heat: 799, reviews: 34567, location: '山东济南', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '综合', '文史', '海洋'], openingHours: '全天', ticket: '免费', lat: 36.6512, lng: 117.0280 },
  { id: 'u28', name: '中国海洋大学', type: 'school', category: '985', description: '海洋水产名校', rating: 4.5, heat: 744, reviews: 23456, location: '山东青岛', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '海洋', '水产', '海景'], openingHours: '全天', ticket: '免费', lat: 36.0583, lng: 120.4316 },

  // 湖南高校
  { id: 'u29', name: '湖南大学', type: 'school', category: '985', description: '千年学府', rating: 4.6, heat: 755, reviews: 23456, location: '湖南长沙', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '岳麓山', '千年'], openingHours: '全天', ticket: '免费', lat: 28.1791, lng: 112.9385 },
  { id: 'u30', name: '中南大学', type: 'school', category: '985', description: '工科医学强校', rating: 4.5, heat: 733, reviews: 34567, location: '湖南长沙', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '医学', '矿业'], openingHours: '全天', ticket: '免费', lat: 28.2229, lng: 112.9388 },

  // 重庆高校
  { id: 'u31', name: '重庆大学', type: 'school', category: '985', description: '山城工科名校', rating: 4.5, heat: 722, reviews: 23456, location: '重庆沙坪坝', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['985', '工科', '建筑', '山城'], openingHours: '全天', ticket: '免费', lat: 29.5630, lng: 106.4575 },
  { id: 'u32', name: '西南大学', type: 'school', category: '211', description: '综合师范名校', rating: 4.4, heat: 677, reviews: 23456, location: '重庆北碚', image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800', tags: ['211', '综合', '师范', '农业'], openingHours: '全天', ticket: '免费', lat: 29.8319, lng: 106.4350 },

  // 更多高校继续添加以达到105个
  // ... 更多高校数据
];

// 景点内部设施数据
export interface Facility {
  id: string;
  name: string;
  type: 'toilet' | 'shop' | 'restaurant' | 'parking' | 'entertainment' | 'medical' | 'atm' | 'info';
  category: string;
  distance: number;
  walkingTime: number;
  lat: number;
  lng: number;
  description: string;
}

export const facilities: Facility[] = [
  // 建筑类
  { id: 'f1', name: '正门', type: 'info', category: '出入口', distance: 0, walkingTime: 0, lat: 39.9160, lng: 116.3970, description: '景区主入口' },
  { id: 'f2', name: '行政楼', type: 'info', category: '办公', distance: 100, walkingTime: 2, lat: 39.9165, lng: 116.3975, description: '景区行政办公楼' },
  { id: 'f3', name: '图书馆', type: 'info', category: '文化', distance: 150, walkingTime: 3, lat: 39.9170, lng: 116.3980, description: '景区图书馆' },
  { id: 'f4', name: '教学楼A', type: 'info', category: '教学', distance: 200, walkingTime: 4, lat: 39.9175, lng: 116.3985, description: '主教学楼A区' },
  { id: 'f5', name: '教学楼B', type: 'info', category: '教学', distance: 220, walkingTime: 4, lat: 39.9178, lng: 116.3988, description: '主教学楼B区' },
  { id: 'f6', name: '实验楼', type: 'info', category: '实验', distance: 250, walkingTime: 5, lat: 39.9180, lng: 116.3990, description: '综合实验楼' },
  { id: 'f7', name: '体育馆', type: 'entertainment', category: '运动', distance: 300, walkingTime: 6, lat: 39.9185, lng: 116.3995, description: '室内体育馆' },
  { id: 'f8', name: '大礼堂', type: 'entertainment', category: '演出', distance: 180, walkingTime: 3, lat: 39.9172, lng: 116.3982, description: '学术报告厅' },
  { id: 'f9', name: '学术中心', type: 'info', category: '学术', distance: 200, walkingTime: 4, lat: 39.9178, lng: 116.3986, description: '学术交流中心' },

  // 服务设施类
  { id: 'f10', name: '食堂1', type: 'restaurant', category: '餐饮', distance: 120, walkingTime: 2, lat: 39.9168, lng: 116.3978, description: '主食堂' },
  { id: 'f11', name: '食堂2', type: 'restaurant', category: '餐饮', distance: 150, walkingTime: 3, lat: 39.9175, lng: 116.3982, description: '风味餐厅' },
  { id: 'f12', name: '食堂3', type: 'restaurant', category: '餐饮', distance: 180, walkingTime: 4, lat: 39.9182, lng: 116.3988, description: '清真餐厅' },
  { id: 'f13', name: '商店1', type: 'shop', category: '购物', distance: 80, walkingTime: 2, lat: 39.9162, lng: 116.3968, description: '便利店' },
  { id: 'f14', name: '商店2', type: 'shop', category: '购物', distance: 100, walkingTime: 2, lat: 39.9166, lng: 116.3972, description: '纪念品店' },
  { id: 'f15', name: '商店3', type: 'shop', category: '购物', distance: 130, walkingTime: 3, lat: 39.9170, lng: 116.3978, description: '文具店' },
  { id: 'f16', name: '商店4', type: 'shop', category: '购物', distance: 150, walkingTime: 3, lat: 39.9174, lng: 116.3982, description: '水果店' },
  { id: 'f17', name: '商店5', type: 'shop', category: '购物', distance: 180, walkingTime: 4, lat: 39.9178, lng: 116.3986, description: '书店' },
  { id: 'f18', name: '商店6', type: 'shop', category: '购物', distance: 200, walkingTime: 4, lat: 39.9182, lng: 116.3990, description: '超市' },
  { id: 'f19', name: '商店7', type: 'shop', category: '购物', distance: 220, walkingTime: 5, lat: 39.9186, lng: 116.3994, description: '药店' },
  { id: 'f20', name: '商店8', type: 'shop', category: '购物', distance: 250, walkingTime: 5, lat: 39.9190, lng: 116.3998, description: '服装店' },
  { id: 'f21', name: '餐厅1', type: 'restaurant', category: '餐饮', distance: 90, walkingTime: 2, lat: 39.9164, lng: 116.3970, description: '咖啡厅' },
  { id: 'f22', name: '餐厅2', type: 'restaurant', category: '餐饮', distance: 110, walkingTime: 2, lat: 39.9168, lng: 116.3975, description: '快餐店' },
  { id: 'f23', name: '餐厅3', type: 'restaurant', category: '餐饮', distance: 140, walkingTime: 3, lat: 39.9172, lng: 116.3980, description: '面馆' },
  { id: 'f24', name: '餐厅4', type: 'restaurant', category: '餐饮', distance: 160, walkingTime: 3, lat: 39.9176, lng: 116.3984, description: '西餐厅' },
  { id: 'f25', name: '餐厅5', type: 'restaurant', category: '餐饮', distance: 190, walkingTime: 4, lat: 39.9180, lng: 116.3988, description: '小吃店' },
  { id: 'f26', name: '餐厅6', type: 'restaurant', category: '餐饮', distance: 210, walkingTime: 4, lat: 39.9184, lng: 116.3992, description: '烧烤店' },
  { id: 'f27', name: '洗手间1', type: 'toilet', category: '卫生间', distance: 50, walkingTime: 1, lat: 39.9163, lng: 116.3968, description: '公共卫生间' },
  { id: 'f28', name: '洗手间2', type: 'toilet', category: '卫生间', distance: 80, walkingTime: 2, lat: 39.9167, lng: 116.3974, description: '公共卫生间' },
  { id: 'f29', name: '洗手间3', type: 'toilet', category: '卫生间', distance: 100, walkingTime: 2, lat: 39.9171, lng: 116.3980, description: '公共卫生间' },
  { id: 'f30', name: '洗手间4', type: 'toilet', category: '卫生间', distance: 120, walkingTime: 2, lat: 39.9175, lng: 116.3986, description: '公共卫生间' },
  { id: 'f31', name: '洗手间5', type: 'toilet', category: '卫生间', distance: 140, walkingTime: 3, lat: 39.9179, lng: 116.3992, description: '公共卫生间' },
  { id: 'f32', name: '洗手间6', type: 'toilet', category: '卫生间', distance: 160, walkingTime: 3, lat: 39.9183, lng: 116.3998, description: '公共卫生间' },
  { id: 'f33', name: '洗手间7', type: 'toilet', category: '卫生间', distance: 180, walkingTime: 4, lat: 39.9187, lng: 116.4004, description: '公共卫生间' },
  { id: 'f34', name: '洗手间8', type: 'toilet', category: '卫生间', distance: 200, walkingTime: 4, lat: 39.9191, lng: 116.4010, description: '公共卫生间' },
  { id: 'f35', name: '洗手间9', type: 'toilet', category: '卫生间', distance: 90, walkingTime: 2, lat: 39.9166, lng: 116.3972, description: '公共卫生间' },
  { id: 'f36', name: '洗手间10', type: 'toilet', category: '卫生间', distance: 110, walkingTime: 2, lat: 39.9170, lng: 116.3978, description: '公共卫生间' },
  { id: 'f37', name: '洗手间11', type: 'toilet', category: '卫生间', distance: 130, walkingTime: 3, lat: 39.9174, lng: 116.3984, description: '公共卫生间' },
  { id: 'f38', name: '洗手间12', type: 'toilet', category: '卫生间', distance: 150, walkingTime: 3, lat: 39.9178, lng: 116.3990, description: '公共卫生间' },
  { id: 'f39', name: '图书馆1', type: 'info', category: '学习', distance: 150, walkingTime: 3, lat: 39.9170, lng: 116.3980, description: '主图书馆' },
  { id: 'f40', name: '图书馆2', type: 'info', category: '学习', distance: 200, walkingTime: 4, lat: 39.9180, lng: 116.3990, description: '分馆' },
  { id: 'f41', name: '超市1', type: 'shop', category: '购物', distance: 100, walkingTime: 2, lat: 39.9168, lng: 116.3978, description: '便利店' },
  { id: 'f42', name: '超市2', type: 'shop', category: '购物', distance: 150, walkingTime: 3, lat: 39.9175, lng: 116.3985, description: '小型超市' },
  { id: 'f43', name: '超市3', type: 'shop', category: '购物', distance: 200, walkingTime: 4, lat: 39.9182, lng: 116.3992, description: '生活超市' },
  { id: 'f44', name: '超市4', type: 'shop', category: '购物', distance: 250, walkingTime: 5, lat: 39.9189, lng: 116.3999, description: '大型超市' },
  { id: 'f45', name: '咖啡馆1', type: 'restaurant', category: '饮品', distance: 80, walkingTime: 2, lat: 39.9165, lng: 116.3975, description: '咖啡厅' },
  { id: 'f46', name: '咖啡馆2', type: 'restaurant', category: '饮品', distance: 130, walkingTime: 3, lat: 39.9172, lng: 116.3982, description: '奶茶店' },
  { id: 'f47', name: '咖啡馆3', type: 'restaurant', category: '饮品', distance: 180, walkingTime: 4, lat: 39.9179, lng: 116.3989, description: '饮品店' },
  { id: 'f48', name: 'ATM1', type: 'atm', category: '金融', distance: 60, walkingTime: 1, lat: 39.9164, lng: 116.3972, description: '中国银行ATM' },
  { id: 'f49', name: 'ATM2', type: 'atm', category: '金融', distance: 100, walkingTime: 2, lat: 39.9170, lng: 116.3980, description: '工商银行ATM' },
  { id: 'f50', name: 'ATM3', type: 'atm', category: '金融', distance: 140, walkingTime: 3, lat: 39.9176, lng: 116.3988, description: '建设银行ATM' },
  { id: 'f51', name: 'ATM4', type: 'atm', category: '金融', distance: 180, walkingTime: 4, lat: 39.9182, lng: 116.3996, description: '农业银行ATM' },
  { id: 'f52', name: '医务室', type: 'medical', category: '医疗', distance: 120, walkingTime: 2, lat: 39.9172, lng: 116.3980, description: '校医院' },
  { id: 'f53', name: '警务室', type: 'info', category: '安保', distance: 150, walkingTime: 3, lat: 39.9176, lng: 116.3986, description: '校园警务室' },
  { id: 'f54', name: '休息区1', type: 'info', category: '休息', distance: 70, walkingTime: 1, lat: 39.9166, lng: 116.3974, description: '户外休息区' },
  { id: 'f55', name: '休息区2', type: 'info', category: '休息', distance: 110, walkingTime: 2, lat: 39.9172, lng: 116.3982, description: '室内休息区' },
  { id: 'f56', name: '休息区3', type: 'info', category: '休息', distance: 150, walkingTime: 3, lat: 39.9178, lng: 116.3990, description: '湖边休息区' },
  { id: 'f57', name: '休息区4', type: 'info', category: '休息', distance: 190, walkingTime: 4, lat: 39.9184, lng: 116.3998, description: '树下休息区' },
  { id: 'f58', name: '休息区5', type: 'info', category: '休息', distance: 230, walkingTime: 5, lat: 39.9190, lng: 116.4006, description: '花园休息区' },
  { id: 'f59', name: '休息区6', type: 'info', category: '休息', distance: 270, walkingTime: 5, lat: 39.9196, lng: 116.4014, description: '亭子休息区' },
  { id: 'f60', name: '停车场1', type: 'parking', category: '停车', distance: 300, walkingTime: 6, lat: 39.9180, lng: 116.3965, description: '地下停车场' },
  { id: 'f61', name: '停车场2', type: 'parking', category: '停车', distance: 400, walkingTime: 8, lat: 39.9195, lng: 116.3970, description: '露天停车场' },
];

// 旅游日记数据
export interface TravelDiary {
  id: string;
  title: string;
  author: string;
  avatar: string;
  content: string;
  images: string[];
  videos: string[];
  date: string;
  location: string;
  views: number;
  rating: number;
  ratings: number[];
  tags: string[];
  likes: number;
}

export const travelDiaries: TravelDiary[] = [
  {
    id: 'd1',
    title: '故宫一日游 | 穿越时空的皇家之旅',
    author: '旅行家小王',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: '红墙黄瓦，一步一景。走在故宫里，仿佛穿越六百年。太和殿的威严，御花园的精巧，都让人震撼。建议早上去，人少更能感受历史厚重。',
    images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800'],
    videos: [],
    date: '2024-03-15',
    location: '故宫博物院',
    views: 12580,
    rating: 4.9,
    ratings: [5, 5, 5, 4, 5],
    tags: ['故宫', '历史', '文化'],
    likes: 856
  },
  {
    id: 'd2',
    title: '鼓浪屿之旅 | 小资文艺打卡地',
    author: '摄影爱好者Lily',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: '小岛真的太适合拍照了！老别墅、小巷、海边，随手都是大片。不用赶时间，慢慢走，吹吹海风，吃点小吃，幸福感爆棚。',
    images: ['https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800'],
    videos: [],
    date: '2024-03-10',
    location: '鼓浪屿',
    views: 9876,
    rating: 4.8,
    ratings: [5, 5, 4, 5, 5],
    tags: ['厦门', '文艺', '海岛'],
    likes: 654
  },
  {
    id: 'd3',
    title: '厦门大学 | 最美校园打卡',
    author: '校园探秘阿泽',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: '不愧是最美校园！建南大礼堂、上弦场、芙蓉湖，面朝大海，春暖花开。在校园里散步，感觉青春又回来了。',
    images: ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'],
    videos: [],
    date: '2024-03-08',
    location: '厦门大学',
    views: 8765,
    rating: 4.7,
    ratings: [5, 5, 4, 5, 4],
    tags: ['校园', '厦门', '青春'],
    likes: 543
  },
  {
    id: 'd4',
    title: '西安回民街 | 美食天堂',
    author: '美食探店酱',
    avatar: 'https://i.pravatar.cc/150?img=4',
    content: '肉夹馍、羊肉泡馍、凉皮、甑糕…… 碳水天堂！每一样都好吃，建议空着肚子来，一路吃到撑。',
    images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800'],
    videos: [],
    date: '2024-03-05',
    location: '西安回民街',
    views: 7654,
    rating: 4.6,
    ratings: [5, 4, 5, 5, 4],
    tags: ['美食', '西安', '小吃'],
    likes: 432
  },
  {
    id: 'd5',
    title: '兵马俑 | 千人千面的震撼',
    author: '历史发烧友老杨',
    avatar: 'https://i.pravatar.cc/150?img=5',
    content: '千人千面，气势恢宏。站在俑坑前，真的会被古人智慧震撼。一定要请讲解，不然只能看热闹。',
    images: ['https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800'],
    videos: [],
    date: '2024-03-01',
    location: '兵马俑',
    views: 11234,
    rating: 4.8,
    ratings: [5, 5, 5, 4, 5],
    tags: ['历史', '西安', '世界遗产'],
    likes: 789
  },
  {
    id: 'd6',
    title: '黄山行 | 奇松怪石云海',
    author: '户外徒步阿凯',
    avatar: 'https://i.pravatar.cc/150?img=6',
    content: '奇松、怪石、云海、温泉，四绝名不虚传。爬山虽累，但山顶风景绝对值得。建议住一晚看日出。',
    images: ['https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800'],
    videos: [],
    date: '2024-02-28',
    location: '黄山',
    views: 9876,
    rating: 4.9,
    ratings: [5, 5, 5, 5, 5],
    tags: ['黄山', '山景', '户外'],
    likes: 867
  },
  {
    id: 'd7',
    title: '凤凰古城 | 沱江边的浪漫',
    author: '文艺青年小夏',
    avatar: 'https://i.pravatar.cc/150?img=7',
    content: '沱江边的吊脚楼，夜晚的红灯笼，安静又浪漫。适合放空、发呆，逃离城市喧嚣。',
    images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800'],
    videos: [],
    date: '2024-02-25',
    location: '凤凰古城',
    views: 6543,
    rating: 4.7,
    ratings: [5, 4, 5, 5, 4],
    tags: ['古城', '湘西', '文艺'],
    likes: 456
  },
  {
    id: 'd8',
    title: '成都慢生活 | 熊猫火锅巴适得板',
    author: '大学生旅游达人',
    avatar: 'https://i.pravatar.cc/150?img=8',
    content: '慢生活太舒服了！逛宽窄巷子，看熊猫，吃火锅，巴适得板。节奏很慢，适合放松。',
    images: ['https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800'],
    videos: [],
    date: '2024-02-20',
    location: '成都',
    views: 8901,
    rating: 4.8,
    ratings: [5, 5, 4, 5, 5],
    tags: ['成都', '美食', '熊猫'],
    likes: 678
  },
  {
    id: 'd9',
    title: '大理之旅 | 风花雪月的回忆',
    author: '毕业旅行策划师',
    avatar: 'https://i.pravatar.cc/150?img=9',
    content: '风花雪月，苍山洱海。环海骑行，看日出日落，和朋友一起，是最棒的毕业回忆。',
    images: ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800'],
    videos: [],
    date: '2024-02-15',
    location: '大理古城',
    views: 9234,
    rating: 4.9,
    ratings: [5, 5, 5, 5, 4],
    tags: ['大理', '毕业', '洱海'],
    likes: 765
  },
  {
    id: 'd10',
    title: '三亚度假 | 蓝天白云沙滩大海',
    author: '情侣出游小情侣',
    avatar: 'https://i.pravatar.cc/150?img=10',
    content: '蓝天，白云、沙滩、大海，度假天堂。海边散步，看日落，超级浪漫。',
    images: ['https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800'],
    videos: [],
    date: '2024-02-10',
    location: '三亚',
    views: 10987,
    rating: 4.8,
    ratings: [5, 5, 5, 4, 5],
    tags: ['三亚', '度假', '浪漫'],
    likes: 890
  }
];

// 美食数据
export interface Food {
  id: string;
  name: string;
  cuisine: string;
  restaurant: string;
  window: string;
  rating: number;
  heat: number;
  reviews: number;
  price: number;
  distance: number;
  description: string;
  image: string;
  tags: string[];
}

export const foods: Food[] = [
  { id: 'food1', name: '北京烤鸭', cuisine: '京菜', restaurant: '全聚德', window: '主餐厅', rating: 4.9, heat: 9567, reviews: 34567, price: 288, distance: 0.5, description: '皮脆肉嫩的经典北京美食', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=800', tags: ['招牌菜', '必吃'] },
  { id: 'food2', name: '炸酱面', cuisine: '京菜', restaurant: '老北京炸酱面馆', window: '面食档口', rating: 4.6, heat: 6543, reviews: 12345, price: 35, distance: 0.3, description: '传统北京风味面条', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', tags: ['特色', '小吃'] },
  { id: 'food3', name: '西湖醋鱼', cuisine: '浙菜', restaurant: '楼外楼', window: '杭帮菜馆', rating: 4.8, heat: 7890, reviews: 23456, price: 128, distance: 1.2, description: '杭州名菜，酸甜可口', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800', tags: ['名菜', '特色'] },
  { id: 'food4', name: '东坡肉', cuisine: '浙菜', restaurant: '知味观', window: '浙菜专区', rating: 4.7, heat: 6789, reviews: 19876, price: 88, distance: 0.8, description: '色泽红亮，肥而不腻', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', tags: ['名菜', '经典'] },
  { id: 'food5', name: '龙井虾仁', cuisine: '浙菜', restaurant: '杭州酒家', window: '茶香菜系', rating: 4.8, heat: 5678, reviews: 15678, price: 168, distance: 1.5, description: '用新鲜龙井茶烹制', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800', tags: ['特色', '时令'] },
  { id: 'food6', name: '麻婆豆腐', cuisine: '川菜', restaurant: '川菜馆', window: '川味档口', rating: 4.5, heat: 5432, reviews: 9876, price: 38, distance: 2.0, description: '麻辣鲜香，下饭神器', image: 'https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?w=800', tags: ['川味', '家常'] },
  { id: 'food7', name: '粤式早茶', cuisine: '粤菜', restaurant: '广州酒家', window: '早茶专区', rating: 4.9, heat: 8765, reviews: 28765, price: 158, distance: 1.8, description: '各式精致点心', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', tags: ['必吃', '特色'] },
  { id: 'food8', name: '驴肉火烧', cuisine: '河北菜', restaurant: '保定风味', window: '特色档口', rating: 4.6, heat: 4321, reviews: 8765, price: 28, distance: 0.6, description: '外酥里嫩，香气四溢', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', tags: ['特色', '小吃'] },
  { id: 'food9', name: '扬州炒饭', cuisine: '淮扬菜', restaurant: '扬州饭店', window: '主食专区', rating: 4.5, heat: 5678, reviews: 16543, price: 48, distance: 1.0, description: '粒粒分明，配料丰富', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800', tags: ['主食', '经典'] },
  { id: 'food10', name: '小笼包', cuisine: '沪菜', restaurant: '南翔馒头店', window: '点心窗口', rating: 4.8, heat: 7890, reviews: 25432, price: 58, distance: 1.3, description: '皮薄汁多，鲜美无比', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800', tags: ['必吃', '点心'] },
  { id: 'food11', name: '重庆火锅', cuisine: '川菜', restaurant: '海底捞', window: '火锅专区', rating: 4.9, heat: 9876, reviews: 45678, price: 198, distance: 2.5, description: '麻辣鲜香，菜品丰富', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', tags: ['必吃', '聚餐'] },
  { id: 'food12', name: '兰州拉面', cuisine: '西北菜', restaurant: '马子禄牛肉面', window: '面食窗口', rating: 4.7, heat: 6543, reviews: 19876, price: 25, distance: 0.4, description: '汤清面劲，一清二白', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800', tags: ['特色', '快餐'] },
];

// 路线规划节点数据
export interface RouteNode {
  id: string;
  name: string;
  type: 'entrance' | 'spot' | 'facility' | 'exit';
  lat: number;
  lng: number;
  floor?: number;
  building?: string;
  category?: string;
}

export interface RouteEdge {
  from: string;
  to: string;
  distance: number;
  time: number;
  congestion: number;
  transportMode: 'walk' | 'bike' | 'shuttle';
  path: { lat: number; lng: number }[];
}

// 完整路线节点数据 - 基于用户提供的建筑和设施列表
export const routeNodes: RouteNode[] = [
  // 出入口
  { id: 'n0', name: '正门', type: 'entrance', lat: 39.9160, lng: 116.3960, category: '出入口' },
  { id: 'n1', name: '东门', type: 'entrance', lat: 39.9165, lng: 116.4030, category: '出入口' },
  { id: 'n2', name: '西门', type: 'entrance', lat: 39.9155, lng: 116.3890, category: '出入口' },
  { id: 'n3', name: '南门', type: 'entrance', lat: 39.9130, lng: 116.3960, category: '出入口' },
  { id: 'n4', name: '北门', type: 'exit', lat: 39.9190, lng: 116.3960, category: '出入口' },

  // 主要建筑
  { id: 'n5', name: '行政楼', type: 'spot', lat: 39.9175, lng: 116.3970, category: '行政' },
  { id: 'n6', name: '图书馆主楼', type: 'spot', lat: 39.9180, lng: 116.3950, category: '文化' },
  { id: 'n7', name: '图书馆分馆', type: 'spot', lat: 39.9178, lng: 116.3980, category: '文化' },
  { id: 'n8', name: '教学楼A', type: 'spot', lat: 39.9165, lng: 116.3940, category: '教学' },
  { id: 'n9', name: '教学楼B', type: 'spot', lat: 39.9170, lng: 116.3930, category: '教学' },
  { id: 'n10', name: '教学楼C', type: 'spot', lat: 39.9175, lng: 116.3920, category: '教学' },
  { id: 'n11', name: '教学楼D', type: 'spot', lat: 39.9180, lng: 116.3910, category: '教学' },
  { id: 'n12', name: '实验楼', type: 'spot', lat: 39.9162, lng: 116.3990, category: '实验' },
  { id: 'n13', name: '体育馆', type: 'spot', lat: 39.9145, lng: 116.3970, category: '运动' },
  { id: 'n14', name: '大礼堂', type: 'spot', lat: 39.9172, lng: 116.3945, category: '演出' },
  { id: 'n15', name: '学术中心', type: 'spot', lat: 39.9185, lng: 116.3940, category: '学术' },

  // 食堂
  { id: 'n16', name: '食堂1', type: 'facility', lat: 39.9168, lng: 116.3955, category: '餐饮' },
  { id: 'n17', name: '食堂2', type: 'facility', lat: 39.9173, lng: 116.3965, category: '餐饮' },
  { id: 'n18', name: '食堂3', type: 'facility', lat: 39.9158, lng: 116.3980, category: '餐饮' },

  // 宿舍区
  { id: 'n19', name: '学生宿舍1', type: 'spot', lat: 39.9140, lng: 116.3930, category: '住宿' },
  { id: 'n20', name: '学生宿舍2', type: 'spot', lat: 39.9145, lng: 116.3920, category: '住宿' },
  { id: 'n21', name: '学生宿舍3', type: 'spot', lat: 39.9150, lng: 116.3910, category: '住宿' },
  { id: 'n22', name: '学生宿舍4', type: 'spot', lat: 39.9155, lng: 116.3900, category: '住宿' },
  { id: 'n23', name: '学生宿舍5', type: 'spot', lat: 39.9140, lng: 116.3900, category: '住宿' },
  { id: 'n24', name: '学生宿舍6', type: 'spot', lat: 39.9145, lng: 116.3890, category: '住宿' },
  { id: 'n25', name: '教师公寓', type: 'spot', lat: 39.9190, lng: 116.3920, category: '住宿' },

  // 服务设施
  { id: 'n26', name: '活动中心', type: 'facility', lat: 39.9170, lng: 116.3995, category: '活动' },
  { id: 'n27', name: '医务室', type: 'facility', lat: 39.9165, lng: 116.3998, category: '医疗' },
  { id: 'n28', name: '保卫处', type: 'facility', lat: 39.9162, lng: 116.3965, category: '安保' },
  { id: 'n29', name: '快递中心', type: 'facility', lat: 39.9155, lng: 116.3925, category: '服务' },
  { id: 'n30', name: '停车场A', type: 'facility', lat: 39.9150, lng: 116.4000, category: '停车' },
  { id: 'n31', name: '停车场B', type: 'facility', lat: 39.9185, lng: 116.4010, category: '停车' },

  // 运动设施
  { id: 'n32', name: '篮球场1', type: 'spot', lat: 39.9148, lng: 116.3950, category: '运动' },
  { id: 'n33', name: '篮球场2', type: 'spot', lat: 39.9152, lng: 116.3945, category: '运动' },
  { id: 'n34', name: '足球场', type: 'spot', lat: 39.9135, lng: 116.3940, category: '运动' },

  // 景点建筑
  { id: 'n35', name: '文创馆', type: 'spot', lat: 39.9178, lng: 116.4005, category: '文化' },
  { id: 'n36', name: '博物馆', type: 'spot', lat: 39.9182, lng: 116.4015, category: '展览' },
  { id: 'n37', name: '观景台', type: 'spot', lat: 39.9192, lng: 116.4000, category: '观光' },
  { id: 'n38', name: '钟楼', type: 'spot', lat: 39.9160, lng: 116.4020, category: '古迹' },
  { id: 'n39', name: '长廊', type: 'spot', lat: 39.9168, lng: 116.4025, category: '景观' },

  // 商店 (8个)
  { id: 'n40', name: '便利店A', type: 'facility', lat: 39.9163, lng: 116.3958, category: '购物' },
  { id: 'n41', name: '便利店B', type: 'facility', lat: 39.9175, lng: 116.3952, category: '购物' },
  { id: 'n42', name: '纪念品店', type: 'facility', lat: 39.9167, lng: 116.3978, category: '购物' },
  { id: 'n43', name: '文具店', type: 'facility', lat: 39.9162, lng: 116.3948, category: '购物' },
  { id: 'n44', name: '水果店', type: 'facility', lat: 39.9170, lng: 116.3965, category: '购物' },
  { id: 'n45', name: '书店', type: 'facility', lat: 39.9177, lng: 116.3955, category: '购物' },
  { id: 'n46', name: '药店', type: 'facility', lat: 39.9165, lng: 116.3975, category: '购物' },
  { id: 'n47', name: '超市', type: 'facility', lat: 39.9158, lng: 116.3950, category: '购物' },

  // 餐厅/饭店 (6个)
  { id: 'n48', name: '咖啡厅', type: 'facility', lat: 39.9168, lng: 116.3950, category: '餐饮' },
  { id: 'n49', name: '奶茶店A', type: 'facility', lat: 39.9172, lng: 116.3958, category: '饮品' },
  { id: 'n50', name: '奶茶店B', type: 'facility', lat: 39.9160, lng: 116.3975, category: '饮品' },
  { id: 'n51', name: '西餐厅', type: 'facility', lat: 39.9175, lng: 116.3968, category: '餐饮' },
  { id: 'n52', name: '快餐店', type: 'facility', lat: 39.9163, lng: 116.3962, category: '餐饮' },
  { id: 'n53', name: '小吃店', type: 'facility', lat: 39.9178, lng: 116.3972, category: '餐饮' },

  // 洗手间 (12个) - 均匀分布
  { id: 'n54', name: '洗手间(正门)', type: 'facility', lat: 39.9162, lng: 116.3963, category: '卫生' },
  { id: 'n55', name: '洗手间(教学楼A)', type: 'facility', lat: 39.9167, lng: 116.3942, category: '卫生' },
  { id: 'n56', name: '洗手间(教学楼B)', type: 'facility', lat: 39.9172, lng: 116.3932, category: '卫生' },
  { id: 'n57', name: '洗手间(图书馆)', type: 'facility', lat: 39.9180, lng: 116.3952, category: '卫生' },
  { id: 'n58', name: '洗手间(食堂1)', type: 'facility', lat: 39.9166, lng: 116.3958, category: '卫生' },
  { id: 'n59', name: '洗手间(食堂2)', type: 'facility', lat: 39.9171, lng: 116.3968, category: '卫生' },
  { id: 'n60', name: '洗手间(体育馆)', type: 'facility', lat: 39.9147, lng: 116.3972, category: '卫生' },
  { id: 'n61', name: '洗手间(学术中心)', type: 'facility', lat: 39.9183, lng: 116.3942, category: '卫生' },
  { id: 'n62', name: '洗手间(宿舍区)', type: 'facility', lat: 39.9148, lng: 116.3915, category: '卫生' },
  { id: 'n63', name: '洗手间(文创馆)', type: 'facility', lat: 39.9176, lng: 116.4008, category: '卫生' },
  { id: 'n64', name: '洗手间(博物馆)', type: 'facility', lat: 39.9180, lng: 116.4018, category: '卫生' },
  { id: 'n65', name: '洗手间(停车场)', type: 'facility', lat: 39.9152, lng: 116.4002, category: '卫生' },

  // ATM/自助机 (4个)
  { id: 'n66', name: 'ATM(正门)', type: 'facility', lat: 39.9161, lng: 116.3962, category: '金融' },
  { id: 'n67', name: 'ATM(图书馆)', type: 'facility', lat: 39.9179, lng: 116.3955, category: '金融' },
  { id: 'n68', name: 'ATM(食堂区)', type: 'facility', lat: 39.9165, lng: 116.3960, category: '金融' },
  { id: 'n69', name: 'ATM(宿舍区)', type: 'facility', lat: 39.9152, lng: 116.3920, category: '金融' },

  // 休息区 (6个)
  { id: 'n70', name: '休息区(中央花园)', type: 'facility', lat: 39.9170, lng: 116.3965, category: '休闲' },
  { id: 'n71', name: '休息区(图书馆前)', type: 'facility', lat: 39.9178, lng: 116.3955, category: '休闲' },
  { id: 'n72', name: '休息区(湖边)', type: 'facility', lat: 39.9185, lng: 116.3975, category: '休闲' },
  { id: 'n73', name: '休息区(教学楼间)', type: 'facility', lat: 39.9173, lng: 116.3940, category: '休闲' },
  { id: 'n74', name: '休息区(体育广场)', type: 'facility', lat: 39.9148, lng: 116.3960, category: '休闲' },
  { id: 'n75', name: '休息区(观景台旁)', type: 'facility', lat: 39.9190, lng: 116.4002, category: '休闲' },

  // 警务室
  { id: 'n76', name: '警务室', type: 'facility', lat: 39.9163, lng: 116.3968, category: '安保' },
];

// 完整的路线边数据 - 实现两两相连的网格化道路网络
export const routeEdges: RouteEdge[] = [
  // 正门区域连接
  { from: 'n0', to: 'n5', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9165, lng: 116.3965 }, { lat: 39.9175, lng: 116.3970 }] },
  { from: 'n0', to: 'n28', distance: 30, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9161, lng: 116.3963 }, { lat: 39.9162, lng: 116.3965 }] },
  { from: 'n0', to: 'n66', distance: 40, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9160, lng: 116.3961 }, { lat: 39.9161, lng: 116.3962 }] },
  { from: 'n0', to: 'n54', distance: 50, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9161, lng: 116.3961 }, { lat: 39.9162, lng: 116.3963 }] },
  { from: 'n0', to: 'n40', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9162, lng: 116.3959 }, { lat: 39.9163, lng: 116.3958 }] },
  { from: 'n0', to: 'n47', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9159, lng: 116.3955 }, { lat: 39.9158, lng: 116.3950 }] },
  { from: 'n0', to: 'n68', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3960 }, { lat: 39.9163, lng: 116.3960 }, { lat: 39.9165, lng: 116.3960 }] },

  // 东门区域
  { from: 'n1', to: 'n38', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9163, lng: 116.4025 }, { lat: 39.9160, lng: 116.4020 }] },
  { from: 'n1', to: 'n31', distance: 150, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9175, lng: 116.4020 }, { lat: 39.9185, lng: 116.4010 }] },
  { from: 'n1', to: 'n39', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9167, lng: 116.4028 }, { lat: 39.9168, lng: 116.4025 }] },
  { from: 'n1', to: 'n36', distance: 200, time: 4, congestion: 0.4, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9173, lng: 116.4023 }, { lat: 39.9182, lng: 116.4015 }] },
  { from: 'n1', to: 'n35', distance: 180, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9172, lng: 116.4018 }, { lat: 39.9178, lng: 116.4005 }] },
  { from: 'n1', to: 'n37', distance: 250, time: 5, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9178, lng: 116.4015 }, { lat: 39.9192, lng: 116.4000 }] },
  { from: 'n1', to: 'n63', distance: 160, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9170, lng: 116.4019 }, { lat: 39.9176, lng: 116.4008 }] },
  { from: 'n1', to: 'n64', distance: 220, time: 4, congestion: 0.4, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.4030 }, { lat: 39.9172, lng: 116.4024 }, { lat: 39.9180, lng: 116.4018 }] },

  // 西门区域
  { from: 'n2', to: 'n19', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9148, lng: 116.3910 }, { lat: 39.9140, lng: 116.3930 }] },
  { from: 'n2', to: 'n24', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9155, lng: 116.3895 }, { lat: 39.9155, lng: 116.3900 }] },
  { from: 'n2', to: 'n23', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9153, lng: 116.3900 }, { lat: 39.9150, lng: 116.3910 }] },
  { from: 'n2', to: 'n29', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9155, lng: 116.3908 }, { lat: 39.9155, lng: 116.3925 }] },
  { from: 'n2', to: 'n69', distance: 110, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9154, lng: 116.3905 }, { lat: 39.9152, lng: 116.3920 }] },
  { from: 'n2', to: 'n62', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9152, lng: 116.3902 }, { lat: 39.9148, lng: 116.3915 }] },
  { from: 'n2', to: 'n25', distance: 350, time: 7, congestion: 0.2, transportMode: 'bike', path: [{ lat: 39.9155, lng: 116.3890 }, { lat: 39.9173, lng: 116.3905 }, { lat: 39.9190, lng: 116.3920 }] },

  // 南门区域
  { from: 'n3', to: 'n13', distance: 150, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9138, lng: 116.3965 }, { lat: 39.9145, lng: 116.3970 }] },
  { from: 'n3', to: 'n74', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9139, lng: 116.3960 }, { lat: 39.9148, lng: 116.3960 }] },
  { from: 'n3', to: 'n34', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9133, lng: 116.3950 }, { lat: 39.9135, lng: 116.3940 }] },
  { from: 'n3', to: 'n32', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9139, lng: 116.3955 }, { lat: 39.9148, lng: 116.3950 }] },
  { from: 'n3', to: 'n33', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9141, lng: 116.3953 }, { lat: 39.9152, lng: 116.3945 }] },
  { from: 'n3', to: 'n60', distance: 170, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9139, lng: 116.3966 }, { lat: 39.9147, lng: 116.3972 }] },
  { from: 'n3', to: 'n30', distance: 200, time: 4, congestion: 0.4, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9140, lng: 116.3980 }, { lat: 39.9150, lng: 116.4000 }] },
  { from: 'n3', to: 'n65', distance: 220, time: 4, congestion: 0.4, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9141, lng: 116.3981 }, { lat: 39.9152, lng: 116.4002 }] },
  { from: 'n3', to: 'n18', distance: 180, time: 4, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9130, lng: 116.3960 }, { lat: 39.9144, lng: 116.3970 }, { lat: 39.9158, lng: 116.3980 }] },

  // 北门区域
  { from: 'n4', to: 'n25', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9190, lng: 116.3940 }, { lat: 39.9190, lng: 116.3920 }] },
  { from: 'n4', to: 'n15', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9188, lng: 116.3950 }, { lat: 39.9185, lng: 116.3940 }] },
  { from: 'n4', to: 'n37', distance: 150, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9191, lng: 116.3980 }, { lat: 39.9192, lng: 116.4000 }] },
  { from: 'n4', to: 'n75', distance: 140, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9190, lng: 116.3981 }, { lat: 39.9190, lng: 116.4002 }] },
  { from: 'n4', to: 'n72', distance: 120, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9188, lng: 116.3968 }, { lat: 39.9185, lng: 116.3975 }] },
  { from: 'n4', to: 'n6', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9185, lng: 116.3955 }, { lat: 39.9180, lng: 116.3950 }] },
  { from: 'n4', to: 'n7', distance: 180, time: 4, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.3960 }, { lat: 39.9184, lng: 116.3970 }, { lat: 39.9178, lng: 116.3980 }] },

  // 行政楼连接
  { from: 'n5', to: 'n70', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9173, lng: 116.3968 }, { lat: 39.9170, lng: 116.3965 }] },
  { from: 'n5', to: 'n16', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9172, lng: 116.3963 }, { lat: 39.9168, lng: 116.3955 }] },
  { from: 'n5', to: 'n17', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9174, lng: 116.3968 }, { lat: 39.9173, lng: 116.3965 }] },
  { from: 'n5', to: 'n27', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9170, lng: 116.3984 }, { lat: 39.9165, lng: 116.3998 }] },
  { from: 'n5', to: 'n26', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9173, lng: 116.3983 }, { lat: 39.9170, lng: 116.3995 }] },
  { from: 'n5', to: 'n46', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9170, lng: 116.3973 }, { lat: 39.9165, lng: 116.3975 }] },
  { from: 'n5', to: 'n42', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9171, lng: 116.3974 }, { lat: 39.9167, lng: 116.3978 }] },
  { from: 'n5', to: 'n76', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3970 }, { lat: 39.9169, lng: 116.3969 }, { lat: 39.9163, lng: 116.3968 }] },

  // 图书馆连接
  { from: 'n6', to: 'n7', distance: 150, time: 3, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9179, lng: 116.3965 }, { lat: 39.9178, lng: 116.3980 }] },
  { from: 'n6', to: 'n57', distance: 40, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9180, lng: 116.3951 }, { lat: 39.9180, lng: 116.3952 }] },
  { from: 'n6', to: 'n67', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9179, lng: 116.3953 }, { lat: 39.9179, lng: 116.3955 }] },
  { from: 'n6', to: 'n71', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9179, lng: 116.3953 }, { lat: 39.9178, lng: 116.3955 }] },
  { from: 'n6', to: 'n15', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9183, lng: 116.3945 }, { lat: 39.9185, lng: 116.3940 }] },
  { from: 'n6', to: 'n8', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9173, lng: 116.3945 }, { lat: 39.9165, lng: 116.3940 }] },
  { from: 'n6', to: 'n9', distance: 150, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9175, lng: 116.3940 }, { lat: 39.9170, lng: 116.3930 }] },
  { from: 'n6', to: 'n10', distance: 180, time: 4, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9178, lng: 116.3935 }, { lat: 39.9175, lng: 116.3920 }] },
  { from: 'n6', to: 'n11', distance: 220, time: 4, congestion: 0.4, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9180, lng: 116.3930 }, { lat: 39.9180, lng: 116.3910 }] },
  { from: 'n6', to: 'n14', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9176, lng: 116.3948 }, { lat: 39.9172, lng: 116.3945 }] },
  { from: 'n6', to: 'n45', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3950 }, { lat: 39.9179, lng: 116.3953 }, { lat: 39.9177, lng: 116.3955 }] },

  // 教学楼A连接
  { from: 'n8', to: 'n9', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9168, lng: 116.3935 }, { lat: 39.9170, lng: 116.3930 }] },
  { from: 'n8', to: 'n14', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9169, lng: 116.3943 }, { lat: 39.9172, lng: 116.3945 }] },
  { from: 'n8', to: 'n16', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9167, lng: 116.3948 }, { lat: 39.9168, lng: 116.3955 }] },
  { from: 'n8', to: 'n55', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9166, lng: 116.3941 }, { lat: 39.9167, lng: 116.3942 }] },
  { from: 'n8', to: 'n40', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9164, lng: 116.3949 }, { lat: 39.9163, lng: 116.3958 }] },
  { from: 'n8', to: 'n48', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9167, lng: 116.3945 }, { lat: 39.9168, lng: 116.3950 }] },
  { from: 'n8', to: 'n73', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9169, lng: 116.3940 }, { lat: 39.9173, lng: 116.3940 }] },
  { from: 'n8', to: 'n10', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3940 }, { lat: 39.9170, lng: 116.3930 }, { lat: 39.9175, lng: 116.3920 }] },

  // 教学楼B连接
  { from: 'n9', to: 'n10', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9173, lng: 116.3925 }, { lat: 39.9175, lng: 116.3920 }] },
  { from: 'n9', to: 'n11', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9175, lng: 116.3920 }, { lat: 39.9180, lng: 116.3910 }] },
  { from: 'n9', to: 'n14', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9171, lng: 116.3938 }, { lat: 39.9172, lng: 116.3945 }] },
  { from: 'n9', to: 'n56', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9171, lng: 116.3931 }, { lat: 39.9172, lng: 116.3932 }] },
  { from: 'n9', to: 'n73', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9172, lng: 116.3935 }, { lat: 39.9173, lng: 116.3940 }] },
  { from: 'n9', to: 'n19', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9155, lng: 116.3930 }, { lat: 39.9140, lng: 116.3930 }] },
  { from: 'n9', to: 'n20', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3930 }, { lat: 39.9158, lng: 116.3925 }, { lat: 39.9145, lng: 116.3920 }] },

  // 教学楼C连接
  { from: 'n10', to: 'n11', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3920 }, { lat: 39.9178, lng: 116.3915 }, { lat: 39.9180, lng: 116.3910 }] },
  { from: 'n10', to: 'n15', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3920 }, { lat: 39.9180, lng: 116.3930 }, { lat: 39.9185, lng: 116.3940 }] },
  { from: 'n10', to: 'n61', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3920 }, { lat: 39.9179, lng: 116.3931 }, { lat: 39.9183, lng: 116.3942 }] },
  { from: 'n10', to: 'n21', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3920 }, { lat: 39.9163, lng: 116.3915 }, { lat: 39.9150, lng: 116.3910 }] },
  { from: 'n10', to: 'n22', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3920 }, { lat: 39.9165, lng: 116.3910 }, { lat: 39.9155, lng: 116.3900 }] },

  // 教学楼D连接
  { from: 'n11', to: 'n15', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3910 }, { lat: 39.9183, lng: 116.3925 }, { lat: 39.9185, lng: 116.3940 }] },
  { from: 'n11', to: 'n23', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3910 }, { lat: 39.9165, lng: 116.3910 }, { lat: 39.9150, lng: 116.3910 }] },
  { from: 'n11', to: 'n24', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3910 }, { lat: 39.9168, lng: 116.3905 }, { lat: 39.9155, lng: 116.3900 }] },
  { from: 'n11', to: 'n25', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3910 }, { lat: 39.9185, lng: 116.3915 }, { lat: 39.9190, lng: 116.3920 }] },
  { from: 'n11', to: 'n29', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3910 }, { lat: 39.9168, lng: 116.3918 }, { lat: 39.9155, lng: 116.3925 }] },

  // 实验楼连接
  { from: 'n12', to: 'n5', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9168, lng: 116.3980 }, { lat: 39.9175, lng: 116.3970 }] },
  { from: 'n12', to: 'n26', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9166, lng: 116.3993 }, { lat: 39.9170, lng: 116.3995 }] },
  { from: 'n12', to: 'n35', distance: 150, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9170, lng: 116.3998 }, { lat: 39.9178, lng: 116.4005 }] },
  { from: 'n12', to: 'n39', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9165, lng: 116.4008 }, { lat: 39.9168, lng: 116.4025 }] },
  { from: 'n12', to: 'n42', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9165, lng: 116.3984 }, { lat: 39.9167, lng: 116.3978 }] },
  { from: 'n12', to: 'n46', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9164, lng: 116.3983 }, { lat: 39.9165, lng: 116.3975 }] },
  { from: 'n12', to: 'n59', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9167, lng: 116.3979 }, { lat: 39.9171, lng: 116.3968 }] },
  { from: 'n12', to: 'n17', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3990 }, { lat: 39.9168, lng: 116.3978 }, { lat: 39.9173, lng: 116.3965 }] },

  // 体育馆连接
  { from: 'n13', to: 'n60', distance: 50, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9146, lng: 116.3971 }, { lat: 39.9147, lng: 116.3972 }] },
  { from: 'n13', to: 'n32', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9147, lng: 116.3960 }, { lat: 39.9148, lng: 116.3950 }] },
  { from: 'n13', to: 'n33', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9149, lng: 116.3958 }, { lat: 39.9152, lng: 116.3945 }] },
  { from: 'n13', to: 'n34', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9140, lng: 116.3955 }, { lat: 39.9135, lng: 116.3940 }] },
  { from: 'n13', to: 'n74', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9147, lng: 116.3965 }, { lat: 39.9148, lng: 116.3960 }] },
  { from: 'n13', to: 'n18', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9152, lng: 116.3975 }, { lat: 39.9158, lng: 116.3980 }] },
  { from: 'n13', to: 'n19', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3970 }, { lat: 39.9143, lng: 116.3950 }, { lat: 39.9140, lng: 116.3930 }] },

  // 大礼堂连接
  { from: 'n14', to: 'n16', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9170, lng: 116.3950 }, { lat: 39.9168, lng: 116.3955 }] },
  { from: 'n14', to: 'n8', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9169, lng: 116.3943 }, { lat: 39.9165, lng: 116.3940 }] },
  { from: 'n14', to: 'n9', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9171, lng: 116.3938 }, { lat: 39.9170, lng: 116.3930 }] },
  { from: 'n14', to: 'n45', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9175, lng: 116.3950 }, { lat: 39.9177, lng: 116.3955 }] },
  { from: 'n14', to: 'n41', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9174, lng: 116.3949 }, { lat: 39.9175, lng: 116.3952 }] },
  { from: 'n14', to: 'n73', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9173, lng: 116.3943 }, { lat: 39.9173, lng: 116.3940 }] },
  { from: 'n14', to: 'n48', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3945 }, { lat: 39.9170, lng: 116.3948 }, { lat: 39.9168, lng: 116.3950 }] },

  // 学术中心连接
  { from: 'n15', to: 'n61', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.3940 }, { lat: 39.9184, lng: 116.3941 }, { lat: 39.9183, lng: 116.3942 }] },
  { from: 'n15', to: 'n7', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.3940 }, { lat: 39.9182, lng: 116.3960 }, { lat: 39.9178, lng: 116.3980 }] },
  { from: 'n15', to: 'n25', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.3940 }, { lat: 39.9188, lng: 116.3930 }, { lat: 39.9190, lng: 116.3920 }] },
  { from: 'n15', to: 'n72', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.3940 }, { lat: 39.9185, lng: 116.3958 }, { lat: 39.9185, lng: 116.3975 }] },
  { from: 'n15', to: 'n37', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.3940 }, { lat: 39.9189, lng: 116.3970 }, { lat: 39.9192, lng: 116.4000 }] },
  { from: 'n15', to: 'n75', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.3940 }, { lat: 39.9188, lng: 116.3971 }, { lat: 39.9190, lng: 116.4002 }] },

  // 食堂连接
  { from: 'n16', to: 'n17', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3955 }, { lat: 39.9171, lng: 116.3960 }, { lat: 39.9173, lng: 116.3965 }] },
  { from: 'n16', to: 'n40', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3955 }, { lat: 39.9166, lng: 116.3957 }, { lat: 39.9163, lng: 116.3958 }] },
  { from: 'n16', to: 'n58', distance: 40, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3955 }, { lat: 39.9167, lng: 116.3957 }, { lat: 39.9166, lng: 116.3958 }] },
  { from: 'n16', to: 'n68', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3955 }, { lat: 39.9167, lng: 116.3958 }, { lat: 39.9165, lng: 116.3960 }] },
  { from: 'n16', to: 'n41', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3955 }, { lat: 39.9172, lng: 116.3954 }, { lat: 39.9175, lng: 116.3952 }] },
  { from: 'n16', to: 'n49', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3955 }, { lat: 39.9170, lng: 116.3957 }, { lat: 39.9172, lng: 116.3958 }] },

  { from: 'n17', to: 'n18', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9166, lng: 116.3973 }, { lat: 39.9158, lng: 116.3980 }] },
  { from: 'n17', to: 'n27', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9169, lng: 116.3982 }, { lat: 39.9165, lng: 116.3998 }] },
  { from: 'n17', to: 'n26', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9172, lng: 116.3980 }, { lat: 39.9170, lng: 116.3995 }] },
  { from: 'n17', to: 'n59', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9172, lng: 116.3967 }, { lat: 39.9171, lng: 116.3968 }] },
  { from: 'n17', to: 'n42', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9170, lng: 116.3972 }, { lat: 39.9167, lng: 116.3978 }] },
  { from: 'n17', to: 'n46', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9169, lng: 116.3970 }, { lat: 39.9165, lng: 116.3975 }] },
  { from: 'n17', to: 'n44', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9172, lng: 116.3965 }, { lat: 39.9170, lng: 116.3965 }] },
  { from: 'n17', to: 'n70', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3965 }, { lat: 39.9172, lng: 116.3965 }, { lat: 39.9170, lng: 116.3965 }] },

  { from: 'n18', to: 'n30', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9158, lng: 116.3980 }, { lat: 39.9154, lng: 116.3990 }, { lat: 39.9150, lng: 116.4000 }] },
  { from: 'n18', to: 'n65', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9158, lng: 116.3980 }, { lat: 39.9155, lng: 116.3991 }, { lat: 39.9152, lng: 116.4002 }] },
  { from: 'n18', to: 'n53', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9158, lng: 116.3980 }, { lat: 39.9168, lng: 116.3976 }, { lat: 39.9178, lng: 116.3972 }] },
  { from: 'n18', to: 'n50', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9158, lng: 116.3980 }, { lat: 39.9159, lng: 116.3978 }, { lat: 39.9160, lng: 116.3975 }] },
  { from: 'n18', to: 'n12', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9158, lng: 116.3980 }, { lat: 39.9160, lng: 116.3985 }, { lat: 39.9162, lng: 116.3990 }] },

  // 宿舍连接
  { from: 'n19', to: 'n20', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9140, lng: 116.3930 }, { lat: 39.9143, lng: 116.3925 }, { lat: 39.9145, lng: 116.3920 }] },
  { from: 'n19', to: 'n32', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9140, lng: 116.3930 }, { lat: 39.9144, lng: 116.3940 }, { lat: 39.9148, lng: 116.3950 }] },
  { from: 'n19', to: 'n29', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9140, lng: 116.3930 }, { lat: 39.9148, lng: 116.3928 }, { lat: 39.9155, lng: 116.3925 }] },
  { from: 'n19', to: 'n23', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9140, lng: 116.3930 }, { lat: 39.9145, lng: 116.3920 }, { lat: 39.9150, lng: 116.3910 }] },
  { from: 'n19', to: 'n25', distance: 250, time: 5, congestion: 0.2, transportMode: 'bike', path: [{ lat: 39.9140, lng: 116.3930 }, { lat: 39.9165, lng: 116.3925 }, { lat: 39.9190, lng: 116.3920 }] },

  { from: 'n20', to: 'n21', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3920 }, { lat: 39.9148, lng: 116.3915 }, { lat: 39.9150, lng: 116.3910 }] },
  { from: 'n20', to: 'n33', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3920 }, { lat: 39.9149, lng: 116.3933 }, { lat: 39.9152, lng: 116.3945 }] },
  { from: 'n20', to: 'n29', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3920 }, { lat: 39.9150, lng: 116.3923 }, { lat: 39.9155, lng: 116.3925 }] },
  { from: 'n20', to: 'n62', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9145, lng: 116.3920 }, { lat: 39.9147, lng: 116.3918 }, { lat: 39.9148, lng: 116.3915 }] },

  { from: 'n21', to: 'n22', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.3910 }, { lat: 39.9153, lng: 116.3905 }, { lat: 39.9155, lng: 116.3900 }] },
  { from: 'n21', to: 'n34', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.3910 }, { lat: 39.9143, lng: 116.3925 }, { lat: 39.9135, lng: 116.3940 }] },
  { from: 'n21', to: 'n29', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.3910 }, { lat: 39.9153, lng: 116.3918 }, { lat: 39.9155, lng: 116.3925 }] },
  { from: 'n21', to: 'n23', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.3910 }, { lat: 39.9150, lng: 116.3910 }, { lat: 39.9150, lng: 116.3910 }] },

  { from: 'n22', to: 'n24', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9155, lng: 116.3900 }, { lat: 39.9155, lng: 116.3900 }] },
  { from: 'n22', to: 'n29', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9155, lng: 116.3913 }, { lat: 39.9155, lng: 116.3925 }] },
  { from: 'n22', to: 'n34', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9145, lng: 116.3920 }, { lat: 39.9135, lng: 116.3940 }] },
  { from: 'n22', to: 'n69', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9154, lng: 116.3910 }, { lat: 39.9152, lng: 116.3920 }] },

  { from: 'n23', to: 'n24', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.3910 }, { lat: 39.9153, lng: 116.3905 }, { lat: 39.9155, lng: 116.3900 }] },
  { from: 'n23', to: 'n29', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.3910 }, { lat: 39.9153, lng: 116.3918 }, { lat: 39.9155, lng: 116.3925 }] },

  { from: 'n24', to: 'n25', distance: 200, time: 4, congestion: 0.2, transportMode: 'bike', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9173, lng: 116.3910 }, { lat: 39.9190, lng: 116.3920 }] },
  { from: 'n24', to: 'n29', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9155, lng: 116.3913 }, { lat: 39.9155, lng: 116.3925 }] },
  { from: 'n24', to: 'n69', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3900 }, { lat: 39.9154, lng: 116.3910 }, { lat: 39.9152, lng: 116.3920 }] },

  // 活动中心连接
  { from: 'n26', to: 'n27', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3995 }, { lat: 39.9168, lng: 116.3997 }, { lat: 39.9165, lng: 116.3998 }] },
  { from: 'n26', to: 'n35', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3995 }, { lat: 39.9174, lng: 116.4000 }, { lat: 39.9178, lng: 116.4005 }] },
  { from: 'n26', to: 'n36', distance: 140, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3995 }, { lat: 39.9176, lng: 116.4005 }, { lat: 39.9182, lng: 116.4015 }] },
  { from: 'n26', to: 'n39', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3995 }, { lat: 39.9169, lng: 116.4010 }, { lat: 39.9168, lng: 116.4025 }] },
  { from: 'n26', to: 'n42', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3995 }, { lat: 39.9169, lng: 116.3987 }, { lat: 39.9167, lng: 116.3978 }] },
  { from: 'n26', to: 'n53', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3995 }, { lat: 39.9174, lng: 116.3984 }, { lat: 39.9178, lng: 116.3972 }] },

  // 停车场连接
  { from: 'n30', to: 'n65', distance: 50, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.4000 }, { lat: 39.9151, lng: 116.4001 }, { lat: 39.9152, lng: 116.4002 }] },
  { from: 'n30', to: 'n35', distance: 140, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.4000 }, { lat: 39.9164, lng: 116.4003 }, { lat: 39.9178, lng: 116.4005 }] },
  { from: 'n30', to: 'n18', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.4000 }, { lat: 39.9154, lng: 116.3990 }, { lat: 39.9158, lng: 116.3980 }] },
  { from: 'n30', to: 'n31', distance: 200, time: 4, congestion: 0.4, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.4000 }, { lat: 39.9168, lng: 116.4005 }, { lat: 39.9185, lng: 116.4010 }] },
  { from: 'n30', to: 'n13', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9150, lng: 116.4000 }, { lat: 39.9148, lng: 116.3985 }, { lat: 39.9145, lng: 116.3970 }] },

  { from: 'n31', to: 'n35', distance: 150, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.4010 }, { lat: 39.9182, lng: 116.4008 }, { lat: 39.9178, lng: 116.4005 }] },
  { from: 'n31', to: 'n37', distance: 130, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.4010 }, { lat: 39.9189, lng: 116.4005 }, { lat: 39.9192, lng: 116.4000 }] },
  { from: 'n31', to: 'n36', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9185, lng: 116.4010 }, { lat: 39.9184, lng: 116.4013 }, { lat: 39.9182, lng: 116.4015 }] },

  // 运动设施连接
  { from: 'n32', to: 'n33', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9148, lng: 116.3950 }, { lat: 39.9150, lng: 116.3948 }, { lat: 39.9152, lng: 116.3945 }] },
  { from: 'n32', to: 'n74', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9148, lng: 116.3950 }, { lat: 39.9148, lng: 116.3955 }, { lat: 39.9148, lng: 116.3960 }] },
  { from: 'n32', to: 'n34', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9148, lng: 116.3950 }, { lat: 39.9142, lng: 116.3945 }, { lat: 39.9135, lng: 116.3940 }] },

  { from: 'n33', to: 'n34', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9152, lng: 116.3945 }, { lat: 39.9144, lng: 116.3943 }, { lat: 39.9135, lng: 116.3940 }] },
  { from: 'n33', to: 'n74', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9152, lng: 116.3945 }, { lat: 39.9150, lng: 116.3953 }, { lat: 39.9148, lng: 116.3960 }] },
  { from: 'n33', to: 'n60', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9152, lng: 116.3945 }, { lat: 39.9150, lng: 116.3959 }, { lat: 39.9147, lng: 116.3972 }] },

  // 景点连接
  { from: 'n35', to: 'n36', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9178, lng: 116.4005 }, { lat: 39.9180, lng: 116.4010 }, { lat: 39.9182, lng: 116.4015 }] },
  { from: 'n35', to: 'n63', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9178, lng: 116.4005 }, { lat: 39.9177, lng: 116.4007 }, { lat: 39.9176, lng: 116.4008 }] },
  { from: 'n35', to: 'n39', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9178, lng: 116.4005 }, { lat: 39.9173, lng: 116.4015 }, { lat: 39.9168, lng: 116.4025 }] },

  { from: 'n36', to: 'n37', distance: 120, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9182, lng: 116.4015 }, { lat: 39.9187, lng: 116.4008 }, { lat: 39.9192, lng: 116.4000 }] },
  { from: 'n36', to: 'n64', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9182, lng: 116.4015 }, { lat: 39.9181, lng: 116.4017 }, { lat: 39.9180, lng: 116.4018 }] },
  { from: 'n36', to: 'n75', distance: 110, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9182, lng: 116.4015 }, { lat: 39.9186, lng: 116.4009 }, { lat: 39.9190, lng: 116.4002 }] },

  { from: 'n37', to: 'n75', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9192, lng: 116.4000 }, { lat: 39.9191, lng: 116.4001 }, { lat: 39.9190, lng: 116.4002 }] },

  { from: 'n38', to: 'n39', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.4020 }, { lat: 39.9164, lng: 116.4023 }, { lat: 39.9168, lng: 116.4025 }] },

  // 商店连接
  { from: 'n40', to: 'n47', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9163, lng: 116.3958 }, { lat: 39.9161, lng: 116.3954 }, { lat: 39.9158, lng: 116.3950 }] },
  { from: 'n40', to: 'n43', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9163, lng: 116.3958 }, { lat: 39.9162, lng: 116.3953 }, { lat: 39.9162, lng: 116.3948 }] },
  { from: 'n40', to: 'n48', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9163, lng: 116.3958 }, { lat: 39.9166, lng: 116.3954 }, { lat: 39.9168, lng: 116.3950 }] },

  { from: 'n41', to: 'n45', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3952 }, { lat: 39.9176, lng: 116.3954 }, { lat: 39.9177, lng: 116.3955 }] },
  { from: 'n41', to: 'n49', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3952 }, { lat: 39.9174, lng: 116.3955 }, { lat: 39.9172, lng: 116.3958 }] },
  { from: 'n41', to: 'n71', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3952 }, { lat: 39.9177, lng: 116.3954 }, { lat: 39.9178, lng: 116.3955 }] },

  { from: 'n42', to: 'n46', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9167, lng: 116.3978 }, { lat: 39.9166, lng: 116.3977 }, { lat: 39.9165, lng: 116.3975 }] },
  { from: 'n42', to: 'n50', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9167, lng: 116.3978 }, { lat: 39.9164, lng: 116.3977 }, { lat: 39.9160, lng: 116.3975 }] },
  { from: 'n42', to: 'n53', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9167, lng: 116.3978 }, { lat: 39.9173, lng: 116.3975 }, { lat: 39.9178, lng: 116.3972 }] },

  { from: 'n43', to: 'n47', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3948 }, { lat: 39.9160, lng: 116.3949 }, { lat: 39.9158, lng: 116.3950 }] },
  { from: 'n43', to: 'n55', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9162, lng: 116.3948 }, { lat: 39.9165, lng: 116.3945 }, { lat: 39.9167, lng: 116.3942 }] },

  { from: 'n44', to: 'n52', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3965 }, { lat: 39.9167, lng: 116.3964 }, { lat: 39.9163, lng: 116.3962 }] },
  { from: 'n44', to: 'n70', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3965 }, { lat: 39.9170, lng: 116.3965 }, { lat: 39.9170, lng: 116.3965 }] },

  { from: 'n45', to: 'n71', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9177, lng: 116.3955 }, { lat: 39.9178, lng: 116.3955 }, { lat: 39.9178, lng: 116.3955 }] },

  { from: 'n46', to: 'n76', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9165, lng: 116.3975 }, { lat: 39.9164, lng: 116.3972 }, { lat: 39.9163, lng: 116.3968 }] },

  // 餐厅连接
  { from: 'n48', to: 'n49', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3950 }, { lat: 39.9170, lng: 116.3954 }, { lat: 39.9172, lng: 116.3958 }] },
  { from: 'n48', to: 'n52', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9168, lng: 116.3950 }, { lat: 39.9166, lng: 116.3956 }, { lat: 39.9163, lng: 116.3962 }] },

  { from: 'n49', to: 'n50', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3958 }, { lat: 39.9166, lng: 116.3967 }, { lat: 39.9160, lng: 116.3975 }] },
  { from: 'n49', to: 'n51', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3958 }, { lat: 39.9174, lng: 116.3963 }, { lat: 39.9175, lng: 116.3968 }] },
  { from: 'n49', to: 'n70', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9172, lng: 116.3958 }, { lat: 39.9171, lng: 116.3962 }, { lat: 39.9170, lng: 116.3965 }] },

  { from: 'n50', to: 'n54', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3975 }, { lat: 39.9161, lng: 116.3969 }, { lat: 39.9162, lng: 116.3963 }] },
  { from: 'n50', to: 'n66', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9160, lng: 116.3975 }, { lat: 39.9160, lng: 116.3969 }, { lat: 39.9161, lng: 116.3962 }] },

  { from: 'n51', to: 'n59', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3968 }, { lat: 39.9173, lng: 116.3968 }, { lat: 39.9171, lng: 116.3968 }] },
  { from: 'n51', to: 'n70', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9175, lng: 116.3968 }, { lat: 39.9173, lng: 116.3967 }, { lat: 39.9170, lng: 116.3965 }] },

  { from: 'n52', to: 'n66', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9163, lng: 116.3962 }, { lat: 39.9162, lng: 116.3962 }, { lat: 39.9161, lng: 116.3962 }] },
  { from: 'n52', to: 'n76', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9163, lng: 116.3962 }, { lat: 39.9163, lng: 116.3965 }, { lat: 39.9163, lng: 116.3968 }] },

  { from: 'n53', to: 'n59', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9178, lng: 116.3972 }, { lat: 39.9175, lng: 116.3970 }, { lat: 39.9171, lng: 116.3968 }] },

  // 洗手间连接 - 部分关键连接
  { from: 'n57', to: 'n67', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3952 }, { lat: 39.9179, lng: 116.3954 }, { lat: 39.9179, lng: 116.3955 }] },
  { from: 'n57', to: 'n72', distance: 90, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3952 }, { lat: 39.9183, lng: 116.3964 }, { lat: 39.9185, lng: 116.3975 }] },
  { from: 'n57', to: 'n71', distance: 70, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9180, lng: 116.3952 }, { lat: 39.9179, lng: 116.3954 }, { lat: 39.9178, lng: 116.3955 }] },

  { from: 'n58', to: 'n68', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9166, lng: 116.3958 }, { lat: 39.9166, lng: 116.3959 }, { lat: 39.9165, lng: 116.3960 }] },

  { from: 'n60', to: 'n74', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9147, lng: 116.3972 }, { lat: 39.9148, lng: 116.3966 }, { lat: 39.9148, lng: 116.3960 }] },

  // 休息区连接
  { from: 'n70', to: 'n72', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3965 }, { lat: 39.9178, lng: 116.3970 }, { lat: 39.9185, lng: 116.3975 }] },
  { from: 'n70', to: 'n73', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9170, lng: 116.3965 }, { lat: 39.9172, lng: 116.3953 }, { lat: 39.9173, lng: 116.3940 }] },

  { from: 'n71', to: 'n72', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9178, lng: 116.3955 }, { lat: 39.9182, lng: 116.3965 }, { lat: 39.9185, lng: 116.3975 }] },

  { from: 'n73', to: 'n56', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9173, lng: 116.3940 }, { lat: 39.9172, lng: 116.3936 }, { lat: 39.9172, lng: 116.3932 }] },

  { from: 'n74', to: 'n13', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9148, lng: 116.3960 }, { lat: 39.9147, lng: 116.3965 }, { lat: 39.9145, lng: 116.3970 }] },

  { from: 'n75', to: 'n37', distance: 50, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9190, lng: 116.4002 }, { lat: 39.9191, lng: 116.4001 }, { lat: 39.9192, lng: 116.4000 }] },

  // 其他设施连接
  { from: 'n29', to: 'n69', distance: 40, time: 1, congestion: 0.1, transportMode: 'walk', path: [{ lat: 39.9155, lng: 116.3925 }, { lat: 39.9154, lng: 116.3923 }, { lat: 39.9152, lng: 116.3920 }] },
  { from: 'n62', to: 'n69', distance: 60, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9148, lng: 116.3915 }, { lat: 39.9150, lng: 116.3918 }, { lat: 39.9152, lng: 116.3920 }] },
  { from: 'n62', to: 'n29', distance: 80, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 39.9148, lng: 116.3915 }, { lat: 39.9152, lng: 116.3920 }, { lat: 39.9155, lng: 116.3925 }] },
];

// ============================================
// 景区内部路线规划数据
// ============================================

export interface ScenicRouteNode {
  id: string;
  name: string;
  type: 'entrance' | 'spot' | 'facility' | 'exit';
  lat: number;
  lng: number;
  category?: string;
}

export interface ScenicRouteEdge {
  from: string;
  to: string;
  distance: number;
  time: number;
  congestion: number;
  transportMode: 'walk' | 'bike' | 'shuttle';
  path: { lat: number; lng: number }[];
}

// 杭州西湖景区真实路线节点数据
// 数据来源：基于OpenStreetMap和公开旅游信息整理
// 西湖坐标范围：lat 30.22-30.28, lng 120.12-120.17
export const scenicRouteNodes: ScenicRouteNode[] = [
  // ============================================
  // 西湖十景（核心景点）
  // ============================================
  // 1. 断桥残雪 - 位于白堤东端，北里湖和外西湖分界点
  { id: 's-dq', name: '断桥残雪', type: 'spot', lat: 30.2546, lng: 120.1529, category: '西湖十景' },
  // 2. 苏堤春晓 - 苏堤南起南屏山麓，北到栖霞岭下，全长近3公里
  { id: 's-st', name: '苏堤春晓', type: 'spot', lat: 30.2420, lng: 120.1390, category: '西湖十景' },
  // 3. 雷峰夕照 - 西湖南岸夕照山上
  { id: 's-lf', name: '雷峰夕照', type: 'spot', lat: 30.2312, lng: 120.1485, category: '西湖十景' },
  // 4. 平湖秋月 - 孤山南麓
  { id: 's-ph', name: '平湖秋月', type: 'spot', lat: 30.2528, lng: 120.1485, category: '西湖十景' },
  // 5. 花港观鱼 - 苏堤南端
  { id: 's-hg', name: '花港观鱼', type: 'spot', lat: 30.2298, lng: 120.1368, category: '西湖十景' },
  // 6. 柳浪闻莺 - 南山路
  { id: 's-ll', name: '柳浪闻莺', type: 'spot', lat: 30.2365, lng: 120.1482, category: '西湖十景' },
  // 7. 曲院风荷 - 北山路附近
  { id: 's-qy', name: '曲院风荷', type: 'spot', lat: 30.2493, lng: 120.1329, category: '西湖十景' },
  // 8. 三潭印月 - 小瀛洲岛上（需乘船）
  { id: 's-sty', name: '三潭印月', type: 'spot', lat: 30.2386, lng: 120.1435, category: '西湖十景' },
  // 9. 双峰插云 - 南高峰和北高峰
  { id: 's-sf', name: '双峰插云', type: 'spot', lat: 30.2350, lng: 120.1250, category: '西湖十景' },
  // 10. 南屏晚钟 - 南屏山净慈寺
  { id: 's-np', name: '南屏晚钟', type: 'spot', lat: 30.2280, lng: 120.1420, category: '西湖十景' },

  // ============================================
  // 新西湖十景
  // ============================================
  { id: 's-yy', name: '云栖竹径', type: 'spot', lat: 30.1750, lng: 120.1050, category: '新西湖十景' },
  { id: 's-bs', name: '宝石流霞', type: 'spot', lat: 30.2480, lng: 120.1550, category: '新西湖十景' },
  { id: 's-mg', name: '满陇桂雨', type: 'spot', lat: 30.2100, lng: 120.1200, category: '新西湖十景' },
  { id: 's-wy', name: '虎跑梦泉', type: 'spot', lat: 30.2050, lng: 120.1350, category: '新西湖十景' },
  { id: 's-ly', name: '龙井问茶', type: 'spot', lat: 30.1800, lng: 120.1000, category: '新西湖十景' },
  { id: 's-ym', name: '九溪烟树', type: 'spot', lat: 30.1700, lng: 120.1200, category: '新西湖十景' },
  { id: 's-wg', name: '吴山天风', type: 'spot', lat: 30.2350, lng: 120.1650, category: '新西湖十景' },
  { id: 's-jc', name: '阮墩环碧', type: 'spot', lat: 30.2430, lng: 120.1480, category: '新西湖十景' },
  { id: 's-hx', name: '黄龙吐翠', type: 'spot', lat: 30.1900, lng: 120.1250, category: '新西湖十景' },
  { id: 's-yt', name: '玉皇飞云', type: 'spot', lat: 30.2150, lng: 120.1550, category: '新西湖十景' },

  // ============================================
  // 其他著名景点
  // ============================================
  { id: 's-gs', name: '孤山', type: 'spot', lat: 30.2545, lng: 120.1491, category: '山水' },
  { id: 's-bd', name: '白堤', type: 'spot', lat: 30.2530, lng: 120.1510, category: '堤桥' },
  { id: 's-yg', name: '杨公堤', type: 'spot', lat: 30.2450, lng: 120.1300, category: '堤桥' },
  { id: 's-cq', name: '长桥公园', type: 'spot', lat: 30.2330, lng: 120.1450, category: '公园' },
  { id: 's-qw', name: '钱王祠', type: 'spot', lat: 30.2390, lng: 120.1500, category: '古迹' },
  { id: 's-xl', name: '西泠印社', type: 'spot', lat: 30.2548, lng: 120.1498, category: '文化' },
  { id: 's-lyy', name: '楼外楼', type: 'spot', lat: 30.2542, lng: 120.1495, category: '餐饮' },
  { id: 's-jxt', name: '集贤亭', type: 'spot', lat: 30.2415, lng: 120.1525, category: '亭台' },
  { id: 's-yue', name: '岳王庙', type: 'spot', lat: 30.2475, lng: 120.1350, category: '古迹' },
  { id: 's-hb', name: '湖滨公园', type: 'spot', lat: 30.2420, lng: 120.1520, category: '公园' },
  { id: 's-sdb', name: '苏东坡纪念馆', type: 'spot', lat: 30.2360, lng: 120.1380, category: '纪念馆' },
  { id: 's-xh', name: '西湖博物馆', type: 'spot', lat: 30.2380, lng: 120.1500, category: '博物馆' },
  { id: 's-jcjy', name: '净慈寺', type: 'spot', lat: 30.2275, lng: 120.1425, category: '寺庙' },
  { id: 's-wss', name: '万松书院', type: 'spot', lat: 30.2280, lng: 120.1520, category: '书院' },
  { id: 's-bg', name: '保俶塔', type: 'spot', lat: 30.2500, lng: 120.1560, category: '塔' },
  { id: 's-hxt', name: '湖心亭', type: 'spot', lat: 30.2420, lng: 120.1460, category: '亭台' },

  // ============================================
  // 出入口与服务设施
  // ============================================
  { id: 's-hbrk', name: '湖滨入口', type: 'entrance', lat: 30.2420, lng: 120.1530, category: '出入口' },
  { id: 's-hxkf', name: '西湖客服中心', type: 'facility', lat: 30.2415, lng: 120.1515, category: '服务' },
  { id: 's-nsyy', name: '南山路入口', type: 'entrance', lat: 30.2350, lng: 120.1480, category: '出入口' },
  { id: 's-wm', name: '吴山广场入口', type: 'entrance', lat: 30.2350, lng: 120.1650, category: '出入口' },

  // ============================================
  // 环湖服务设施
  // ============================================
  // 公共洗手间
  { id: 'st-1', name: '洗手间(断桥)', type: 'facility', lat: 30.2548, lng: 120.1531, category: '卫生' },
  { id: 'st-2', name: '洗手间(平湖秋月)', type: 'facility', lat: 30.2530, lng: 120.1487, category: '卫生' },
  { id: 'st-3', name: '洗手间(曲院风荷)', type: 'facility', lat: 30.2495, lng: 120.1331, category: '卫生' },
  { id: 'st-4', name: '洗手间(苏堤北)', type: 'facility', lat: 30.2470, lng: 120.1350, category: '卫生' },
  { id: 'st-5', name: '洗手间(花港观鱼)', type: 'facility', lat: 30.2300, lng: 120.1370, category: '卫生' },
  { id: 'st-6', name: '洗手间(雷峰塔)', type: 'facility', lat: 30.2315, lng: 120.1487, category: '卫生' },
  { id: 'st-7', name: '洗手间(柳浪闻莺)', type: 'facility', lat: 30.2367, lng: 120.1484, category: '卫生' },
  { id: 'st-8', name: '洗手间(湖滨)', type: 'facility', lat: 30.2422, lng: 120.1522, category: '卫生' },
  { id: 'st-9', name: '洗手间(长桥)', type: 'facility', lat: 30.2332, lng: 120.1452, category: '卫生' },
  { id: 'st-10', name: '洗手间(钱王祠)', type: 'facility', lat: 30.2392, lng: 120.1502, category: '卫生' },

  // 餐饮服务
  { id: 'sr-1', name: '楼外楼(孤山路)', type: 'facility', lat: 30.2542, lng: 120.1495, category: '餐饮' },
  { id: 'sr-2', name: '外婆家(湖滨)', type: 'facility', lat: 30.2418, lng: 120.1525, category: '餐饮' },
  { id: 'sr-3', name: '绿茶餐厅(南山)', type: 'facility', lat: 30.2355, lng: 120.1475, category: '餐饮' },
  { id: 'sr-4', name: '知味观(湖滨)', type: 'facility', lat: 30.2415, lng: 120.1535, category: '餐饮' },
  { id: 'sr-5', name: '花港茶楼', type: 'facility', lat: 30.2300, lng: 120.1370, category: '餐饮' },
  { id: 'sr-6', name: '湖畔大学咖啡', type: 'facility', lat: 30.2380, lng: 120.1505, category: '饮品' },
  { id: 'sr-7', name: '星巴克(湖滨)', type: 'facility', lat: 30.2425, lng: 120.1528, category: '饮品' },
  { id: 'sr-8', name: '雷峰塔茶室', type: 'facility', lat: 30.2310, lng: 120.1483, category: '饮品' },

  // 购物商店
  { id: 'ss-1', name: '西湖丝绸店', type: 'facility', lat: 30.2540, lng: 120.1500, category: '购物' },
  { id: 'ss-2', name: '龙井茶叶店', type: 'facility', lat: 30.2380, lng: 120.1490, category: '购物' },
  { id: 'ss-3', name: '西湖纪念品店', type: 'facility', lat: 30.2420, lng: 120.1520, category: '购物' },
  { id: 'ss-4', name: '张小泉剪刀', type: 'facility', lat: 30.2545, lng: 120.1490, category: '购物' },
  { id: 'ss-5', name: '王星记扇庄', type: 'facility', lat: 30.2535, lng: 120.1485, category: '购物' },
  { id: 'ss-6', name: '都锦生丝织', type: 'facility', lat: 30.2360, lng: 120.1480, category: '购物' },

  // 休息区
  { id: 'sv-1', name: '孤山亭休息区', type: 'facility', lat: 30.2547, lng: 120.1493, category: '休闲' },
  { id: 'sv-2', name: '苏堤休息亭', type: 'facility', lat: 30.2400, lng: 120.1380, category: '休闲' },
  { id: 'sv-3', name: '断桥观景台', type: 'facility', lat: 30.2548, lng: 120.1531, category: '休闲' },
  { id: 'sv-4', name: '湖滨长廊', type: 'facility', lat: 30.2425, lng: 120.1520, category: '休闲' },
  { id: 'sv-5', name: '南山路茶座', type: 'facility', lat: 30.2350, lng: 120.1485, category: '休闲' },

  // 交通设施
  { id: 'sf-1', name: '游船码头(花港)', type: 'facility', lat: 30.2300, lng: 120.1365, category: '交通' },
  { id: 'sf-2', name: '游船码头(湖滨)', type: 'facility', lat: 30.2425, lng: 120.1525, category: '交通' },
  { id: 'sf-3', name: '电瓶车(苏堤)', type: 'facility', lat: 30.2430, lng: 120.1385, category: '交通' },
  { id: 'sf-4', name: '自行车租赁(湖滨)', type: 'facility', lat: 30.2420, lng: 120.1520, category: '交通' },
  { id: 'sf-5', name: '自行车租赁(南山)', type: 'facility', lat: 30.2355, lng: 120.1480, category: '交通' },

  // 停车设施
  { id: 'sp-1', name: '湖滨停车场', type: 'facility', lat: 30.2400, lng: 120.1540, category: '停车' },
  { id: 'sp-2', name: '苏堤停车场', type: 'facility', lat: 30.2430, lng: 120.1350, category: '停车' },
  { id: 'sp-3', name: '雷峰塔停车场', type: 'facility', lat: 30.2300, lng: 120.1470, category: '停车' },
  { id: 'sp-4', name: '孤山路停车场', type: 'facility', lat: 30.2535, lng: 120.1490, category: '停车' },

  // 医疗与安全
  { id: 'sm-1', name: '急救站(湖滨)', type: 'facility', lat: 30.2420, lng: 120.1515, category: '医疗' },
  { id: 'sm-2', name: '急救站(南山)', type: 'facility', lat: 30.2350, lng: 120.1475, category: '医疗' },
  { id: 'sa-1', name: '保安值勤点(断桥)', type: 'facility', lat: 30.2545, lng: 120.1527, category: '安保' },
  { id: 'sa-2', name: '保安值勤点(雷峰塔)', type: 'facility', lat: 30.2310, lng: 120.1483, category: '安保' },
];

// 杭州西湖景区真实道路连接数据
// 基于西湖实际地理和步行路线整理
// 环湖一周约10.48-11.5公里
export const scenicRouteEdges: ScenicRouteEdge[] = [
  // ============================================
  // 环湖主路 - 北山路/湖滨路
  // ============================================
  // 断桥 → 平湖秋月 → 曲院风荷
  { from: 's-dq', to: 's-ph', distance: 450, time: 6, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2537, lng: 120.1507 }, { lat: 30.2528, lng: 120.1485 }] },
  { from: 's-ph', to: 's-qy', distance: 550, time: 8, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2528, lng: 120.1485 }, { lat: 30.2510, lng: 120.1407 }, { lat: 30.2493, lng: 120.1329 }] },
  { from: 's-dq', to: 's-gs', distance: 300, time: 4, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2546, lng: 120.1510 }, { lat: 30.2545, lng: 120.1491 }] },

  // 断桥 → 湖滨公园
  { from: 's-dq', to: 's-hb', distance: 800, time: 10, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2483, lng: 120.1529 }, { lat: 30.2420, lng: 120.1520 }] },
  { from: 's-ph', to: 's-xl', distance: 200, time: 3, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2528, lng: 120.1485 }, { lat: 30.2538, lng: 120.1492 }, { lat: 30.2548, lng: 120.1498 }] },

  // ============================================
  // 环湖主路 - 南山路
  // ============================================
  // 湖滨 → 柳浪闻莺 → 长桥 → 雷峰塔
  { from: 's-hb', to: 's-ll', distance: 600, time: 8, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2393, lng: 120.1501 }, { lat: 30.2365, lng: 120.1482 }] },
  { from: 's-ll', to: 's-cq', distance: 500, time: 7, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2365, lng: 120.1482 }, { lat: 30.2348, lng: 120.1466 }, { lat: 30.2330, lng: 120.1450 }] },
  { from: 's-cq', to: 's-lf', distance: 450, time: 6, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2330, lng: 120.1450 }, { lat: 30.2321, lng: 120.1468 }, { lat: 30.2312, lng: 120.1485 }] },

  // ============================================
  // 苏堤连接
  // ============================================
  // 曲院风荷 → 苏堤北 → 苏堤南 → 花港观鱼
  { from: 's-qy', to: 's-st', distance: 800, time: 12, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2493, lng: 120.1329 }, { lat: 30.2457, lng: 120.1360 }, { lat: 30.2420, lng: 120.1390 }] },
  { from: 's-st', to: 's-hg', distance: 700, time: 10, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2359, lng: 120.1379 }, { lat: 30.2298, lng: 120.1368 }] },
  { from: 's-st', to: 's-yue', distance: 300, time: 4, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2448, lng: 120.1370 }, { lat: 30.2475, lng: 120.1350 }] },
  { from: 's-st', to: 's-sdb', distance: 200, time: 3, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2390, lng: 120.1385 }, { lat: 30.2360, lng: 120.1380 }] },

  // 苏堤与南屏晚钟
  { from: 's-hg', to: 's-np', distance: 400, time: 6, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2289, lng: 120.1394 }, { lat: 30.2280, lng: 120.1420 }] },
  { from: 's-np', to: 's-lf', distance: 600, time: 8, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2280, lng: 120.1420 }, { lat: 30.2296, lng: 120.1453 }, { lat: 30.2312, lng: 120.1485 }] },

  // ============================================
  // 岛屿连接 - 需要乘船
  // ============================================
  { from: 's-sty', to: 's-hxt', distance: 500, time: 15, congestion: 0.2, transportMode: 'shuttle', path: [{ lat: 30.2386, lng: 120.1435 }, { lat: 30.2403, lng: 120.1448 }, { lat: 30.2420, lng: 120.1460 }] },
  { from: 's-sty', to: 's-jc', distance: 400, time: 12, congestion: 0.2, transportMode: 'shuttle', path: [{ lat: 30.2386, lng: 120.1435 }, { lat: 30.2408, lng: 120.1458 }, { lat: 30.2430, lng: 120.1480 }] },

  // ============================================
  // 出入口连接
  // ============================================
  { from: 's-hbrk', to: 's-hb', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1530 }, { lat: 30.2420, lng: 120.1525 }, { lat: 30.2420, lng: 120.1520 }] },
  { from: 's-hbrk', to: 's-hxkf', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1530 }, { lat: 30.2418, lng: 120.1523 }, { lat: 30.2415, lng: 120.1515 }] },
  { from: 's-nsyy', to: 's-ll', distance: 150, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2358, lng: 120.1481 }, { lat: 30.2365, lng: 120.1482 }] },

  // ============================================
  // 景点之间连接
  // ============================================
  // 孤山区域
  { from: 's-gs', to: 's-xl', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2547, lng: 120.1495 }, { lat: 30.2548, lng: 120.1498 }] },
  { from: 's-gs', to: 's-ph', distance: 150, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2537, lng: 120.1488 }, { lat: 30.2528, lng: 120.1485 }] },
  { from: 's-gs', to: 's-lyy', distance: 80, time: 1, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2544, lng: 120.1493 }, { lat: 30.2542, lng: 120.1495 }] },
  { from: 's-gs', to: 's-qw', distance: 900, time: 12, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2468, lng: 120.1496 }, { lat: 30.2390, lng: 120.1500 }] },
  { from: 's-gs', to: 's-bg', distance: 700, time: 10, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2523, lng: 120.1526 }, { lat: 30.2500, lng: 120.1560 }] },

  // 湖滨区域
  { from: 's-hb', to: 's-jxt', distance: 80, time: 1, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2418, lng: 120.1523 }, { lat: 30.2415, lng: 120.1525 }] },
  { from: 's-hb', to: 's-qw', distance: 400, time: 6, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2405, lng: 120.1510 }, { lat: 30.2390, lng: 120.1500 }] },
  { from: 's-hb', to: 's-xh', distance: 500, time: 7, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2400, lng: 120.1510 }, { lat: 30.2380, lng: 120.1500 }] },

  // 雷峰塔区域
  { from: 's-lf', to: 's-jcjy', distance: 200, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2294, lng: 120.1455 }, { lat: 30.2275, lng: 120.1425 }] },
  { from: 's-lf', to: 's-wss', distance: 400, time: 6, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2296, lng: 120.1503 }, { lat: 30.2280, lng: 120.1520 }] },

  // 钱王祠连接
  { from: 's-qw', to: 's-ll', distance: 400, time: 6, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2390, lng: 120.1500 }, { lat: 30.2378, lng: 120.1491 }, { lat: 30.2365, lng: 120.1482 }] },
  { from: 's-qw', to: 's-xh', distance: 150, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2390, lng: 120.1500 }, { lat: 30.2385, lng: 120.1500 }, { lat: 30.2380, lng: 120.1500 }] },

  // ============================================
  // 服务设施连接
  // ============================================
  // 洗手间
  { from: 's-dq', to: 'st-1', distance: 50, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2547, lng: 120.1530 }, { lat: 30.2548, lng: 120.1531 }] },
  { from: 's-ph', to: 'st-2', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2528, lng: 120.1485 }, { lat: 30.2529, lng: 120.1486 }, { lat: 30.2530, lng: 120.1487 }] },
  { from: 's-qy', to: 'st-3', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2493, lng: 120.1329 }, { lat: 30.2494, lng: 120.1330 }, { lat: 30.2495, lng: 120.1331 }] },
  { from: 's-st', to: 'st-4', distance: 500, time: 7, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2445, lng: 120.1370 }, { lat: 30.2470, lng: 120.1350 }] },
  { from: 's-hg', to: 'st-5', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2299, lng: 120.1369 }, { lat: 30.2300, lng: 120.1370 }] },
  { from: 's-lf', to: 'st-6', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2314, lng: 120.1486 }, { lat: 30.2315, lng: 120.1487 }] },
  { from: 's-ll', to: 'st-7', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2365, lng: 120.1482 }, { lat: 30.2366, lng: 120.1483 }, { lat: 30.2367, lng: 120.1484 }] },
  { from: 's-hb', to: 'st-8', distance: 80, time: 1, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2421, lng: 120.1521 }, { lat: 30.2422, lng: 120.1522 }] },
  { from: 's-cq', to: 'st-9', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2330, lng: 120.1450 }, { lat: 30.2331, lng: 120.1451 }, { lat: 30.2332, lng: 120.1452 }] },
  { from: 's-qw', to: 'st-10', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2390, lng: 120.1500 }, { lat: 30.2391, lng: 120.1501 }, { lat: 30.2392, lng: 120.1502 }] },

  // 餐饮
  { from: 's-gs', to: 'sr-1', distance: 100, time: 2, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2544, lng: 120.1493 }, { lat: 30.2542, lng: 120.1495 }] },
  { from: 's-hb', to: 'sr-2', distance: 100, time: 2, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2419, lng: 120.1523 }, { lat: 30.2418, lng: 120.1525 }] },
  { from: 's-nsyy', to: 'sr-3', distance: 150, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2353, lng: 120.1478 }, { lat: 30.2355, lng: 120.1475 }] },
  { from: 's-hb', to: 'sr-4', distance: 150, time: 2, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2418, lng: 120.1528 }, { lat: 30.2415, lng: 120.1535 }] },
  { from: 's-hg', to: 'sr-5', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2299, lng: 120.1369 }, { lat: 30.2300, lng: 120.1370 }] },
  { from: 's-xh', to: 'sr-6', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2380, lng: 120.1500 }, { lat: 30.2380, lng: 120.1503 }, { lat: 30.2380, lng: 120.1505 }] },
  { from: 's-hb', to: 'sr-7', distance: 100, time: 2, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2423, lng: 120.1524 }, { lat: 30.2425, lng: 120.1528 }] },
  { from: 's-lf', to: 'sr-8', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2311, lng: 120.1484 }, { lat: 30.2310, lng: 120.1483 }] },

  // 购物
  { from: 's-hb', to: 'ss-1', distance: 300, time: 4, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2480, lng: 120.1510 }, { lat: 30.2540, lng: 120.1500 }] },
  { from: 's-xh', to: 'ss-2', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2380, lng: 120.1500 }, { lat: 30.2380, lng: 120.1495 }, { lat: 30.2380, lng: 120.1490 }] },
  { from: 's-hb', to: 'ss-3', distance: 80, time: 1, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2420, lng: 120.1520 }, { lat: 30.2420, lng: 120.1520 }] },
  { from: 's-gs', to: 'ss-4', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2545, lng: 120.1491 }, { lat: 30.2545, lng: 120.1490 }] },
  { from: 's-ph', to: 'ss-5', distance: 150, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2528, lng: 120.1485 }, { lat: 30.2532, lng: 120.1485 }, { lat: 30.2535, lng: 120.1485 }] },
  { from: 's-nsyy', to: 'ss-6', distance: 200, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2355, lng: 120.1480 }, { lat: 30.2360, lng: 120.1480 }] },

  // 休息区
  { from: 's-gs', to: 'sv-1', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2546, lng: 120.1492 }, { lat: 30.2547, lng: 120.1493 }] },
  { from: 's-st', to: 'sv-2', distance: 500, time: 7, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2410, lng: 120.1385 }, { lat: 30.2400, lng: 120.1380 }] },
  { from: 's-dq', to: 'sv-3', distance: 80, time: 1, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2547, lng: 120.1530 }, { lat: 30.2548, lng: 120.1531 }] },
  { from: 's-hb', to: 'sv-4', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2423, lng: 120.1520 }, { lat: 30.2425, lng: 120.1520 }] },
  { from: 's-nsyy', to: 'sv-5', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2350, lng: 120.1483 }, { lat: 30.2350, lng: 120.1485 }] },

  // 交通设施
  { from: 's-hg', to: 'sf-1', distance: 100, time: 2, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2299, lng: 120.1367 }, { lat: 30.2300, lng: 120.1365 }] },
  { from: 's-hb', to: 'sf-2', distance: 100, time: 2, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2423, lng: 120.1523 }, { lat: 30.2425, lng: 120.1525 }] },
  { from: 's-st', to: 'sf-3', distance: 150, time: 2, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2425, lng: 120.1388 }, { lat: 30.2430, lng: 120.1385 }] },
  { from: 's-hb', to: 'sf-4', distance: 80, time: 1, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2420, lng: 120.1520 }, { lat: 30.2420, lng: 120.1520 }] },
  { from: 's-nsyy', to: 'sf-5', distance: 100, time: 2, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2353, lng: 120.1480 }, { lat: 30.2355, lng: 120.1480 }] },

  // 停车场
  { from: 's-hb', to: 'sp-1', distance: 300, time: 4, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1520 }, { lat: 30.2410, lng: 120.1530 }, { lat: 30.2400, lng: 120.1540 }] },
  { from: 's-st', to: 'sp-2', distance: 300, time: 4, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2425, lng: 120.1370 }, { lat: 30.2430, lng: 120.1350 }] },
  { from: 's-lf', to: 'sp-3', distance: 200, time: 3, congestion: 0.4, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2306, lng: 120.1478 }, { lat: 30.2300, lng: 120.1470 }] },
  { from: 's-gs', to: 'sp-4', distance: 200, time: 3, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2545, lng: 120.1491 }, { lat: 30.2540, lng: 120.1491 }, { lat: 30.2535, lng: 120.1490 }] },

  // 医疗与安保
  { from: 's-hxkf', to: 'sm-1', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2415, lng: 120.1515 }, { lat: 30.2418, lng: 120.1515 }, { lat: 30.2420, lng: 120.1515 }] },
  { from: 's-nsyy', to: 'sm-2', distance: 100, time: 2, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2350, lng: 120.1478 }, { lat: 30.2350, lng: 120.1475 }] },
  { from: 's-dq', to: 'sa-1', distance: 80, time: 1, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2546, lng: 120.1528 }, { lat: 30.2545, lng: 120.1527 }] },
  { from: 's-lf', to: 'sa-2', distance: 80, time: 1, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2311, lng: 120.1484 }, { lat: 30.2310, lng: 120.1483 }] },

  // ============================================
  // 环湖电瓶车路线（可行驶道路）
  // ============================================
  // 湖滨 → 断桥 → 曲院风荷 → 苏堤 → 花港观鱼 → 雷峰塔 → 柳浪闻莺 → 湖滨
  { from: 's-hbrk', to: 's-dq', distance: 800, time: 5, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2420, lng: 120.1530 }, { lat: 30.2483, lng: 120.1530 }, { lat: 30.2546, lng: 120.1529 }] },
  { from: 's-dq', to: 's-qy', distance: 1000, time: 6, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2520, lng: 120.1429 }, { lat: 30.2493, lng: 120.1329 }] },
  { from: 's-qy', to: 's-st', distance: 800, time: 5, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2493, lng: 120.1329 }, { lat: 30.2457, lng: 120.1360 }, { lat: 30.2420, lng: 120.1390 }] },
  { from: 's-st', to: 's-hg', distance: 700, time: 4, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2359, lng: 120.1379 }, { lat: 30.2298, lng: 120.1368 }] },
  { from: 's-hg', to: 's-lf', distance: 450, time: 3, congestion: 0.4, transportMode: 'shuttle', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2305, lng: 120.1427 }, { lat: 30.2312, lng: 120.1485 }] },
  { from: 's-lf', to: 's-nsyy', distance: 700, time: 4, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2331, lng: 120.1483 }, { lat: 30.2350, lng: 120.1480 }] },
  { from: 's-nsyy', to: 's-hbrk', distance: 800, time: 5, congestion: 0.3, transportMode: 'shuttle', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2385, lng: 120.1505 }, { lat: 30.2420, lng: 120.1530 }] },

  // ============================================
  // 环湖骑行路线
  // ============================================
  // 杨公堤连接（可骑行）
  { from: 's-qy', to: 's-yg', distance: 500, time: 4, congestion: 0.2, transportMode: 'bike', path: [{ lat: 30.2493, lng: 120.1329 }, { lat: 30.2472, lng: 120.1315 }, { lat: 30.2450, lng: 120.1300 }] },
  { from: 's-yg', to: 's-st', distance: 500, time: 4, congestion: 0.2, transportMode: 'bike', path: [{ lat: 30.2450, lng: 120.1300 }, { lat: 30.2435, lng: 120.1345 }, { lat: 30.2420, lng: 120.1390 }] },
  { from: 's-yg', to: 's-hg', distance: 800, time: 6, congestion: 0.2, transportMode: 'bike', path: [{ lat: 30.2450, lng: 120.1300 }, { lat: 30.2374, lng: 120.1334 }, { lat: 30.2298, lng: 120.1368 }] },

  // 白堤（步行/骑行）
  { from: 's-dq', to: 's-bd', distance: 300, time: 4, congestion: 0.4, transportMode: 'bike', path: [{ lat: 30.2546, lng: 120.1529 }, { lat: 30.2538, lng: 120.1520 }, { lat: 30.2530, lng: 120.1510 }] },
  { from: 's-bd', to: 's-ph', distance: 300, time: 4, congestion: 0.4, transportMode: 'bike', path: [{ lat: 30.2530, lng: 120.1510 }, { lat: 30.2529, lng: 120.1498 }, { lat: 30.2528, lng: 120.1485 }] },

  // ============================================
  // 新西湖十景连接
  // ============================================
  { from: 's-nsyy', to: 's-yt', distance: 2000, time: 30, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2250, lng: 120.1515 }, { lat: 30.2150, lng: 120.1550 }] },
  { from: 's-lf', to: 's-yt', distance: 1800, time: 25, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2312, lng: 120.1485 }, { lat: 30.2231, lng: 120.1518 }, { lat: 30.2150, lng: 120.1550 }] },
  { from: 's-hg', to: 's-wy', distance: 2800, time: 40, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2174, lng: 120.1359 }, { lat: 30.2050, lng: 120.1350 }] },
  { from: 's-wy', to: 's-ly', distance: 2500, time: 35, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2050, lng: 120.1350 }, { lat: 30.1925, lng: 120.1175 }, { lat: 30.1800, lng: 120.1000 }] },
  { from: 's-ly', to: 's-yy', distance: 2200, time: 30, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.1800, lng: 120.1000 }, { lat: 30.1775, lng: 120.1025 }, { lat: 30.1750, lng: 120.1050 }] },
  { from: 's-hg', to: 's-ym', distance: 6000, time: 90, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2298, lng: 120.1368 }, { lat: 30.2000, lng: 120.1284 }, { lat: 30.1700, lng: 120.1200 }] },
  { from: 's-qy', to: 's-hx', distance: 5500, time: 80, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2493, lng: 120.1329 }, { lat: 30.2197, lng: 120.1290 }, { lat: 30.1900, lng: 120.1250 }] },
  { from: 's-qy', to: 's-mg', distance: 4000, time: 55, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2493, lng: 120.1329 }, { lat: 30.2297, lng: 120.1265 }, { lat: 30.2100, lng: 120.1200 }] },
  { from: 's-nsyy', to: 's-wg', distance: 1700, time: 25, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2350, lng: 120.1480 }, { lat: 30.2350, lng: 120.1565 }, { lat: 30.2350, lng: 120.1650 }] },
  { from: 's-hbrk', to: 's-bs', distance: 800, time: 12, congestion: 0.3, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1530 }, { lat: 30.2450, lng: 120.1540 }, { lat: 30.2480, lng: 120.1550 }] },
  { from: 's-st', to: 's-sf', distance: 1500, time: 25, congestion: 0.2, transportMode: 'walk', path: [{ lat: 30.2420, lng: 120.1390 }, { lat: 30.2385, lng: 120.1320 }, { lat: 30.2350, lng: 120.1250 }] },
];

// 室内导航数据
export interface IndoorNode {
  id: string;
  name: string;
  type: 'entrance' | 'elevator' | 'room' | 'stairs' | 'exit';
  floor: number;
  building: string;
  lat: number;
  lng: number;
}

export const indoorNodes: IndoorNode[] = [
  // 教学楼A室内节点
  { id: 'i1', name: '大厅入口', type: 'entrance', floor: 1, building: '教学楼A', lat: 39.9160, lng: 116.3965 },
  { id: 'i2', name: '电梯', type: 'elevator', floor: 1, building: '教学楼A', lat: 39.9162, lng: 116.3967 },
  { id: 'i3', name: '101教室', type: 'room', floor: 1, building: '教学楼A', lat: 39.9161, lng: 116.3968 },
  { id: 'i4', name: '102教室', type: 'room', floor: 1, building: '教学楼A', lat: 39.9161, lng: 116.3969 },
  { id: 'i5', name: '楼梯', type: 'stairs', floor: 1, building: '教学楼A', lat: 39.9162, lng: 116.3966 },
  // 二楼
  { id: 'i6', name: '电梯', type: 'elevator', floor: 2, building: '教学楼A', lat: 39.9162, lng: 116.3967 },
  { id: 'i7', name: '201教室', type: 'room', floor: 2, building: '教学楼A', lat: 39.9161, lng: 116.3968 },
  { id: 'i8', name: '202教室', type: 'room', floor: 2, building: '教学楼A', lat: 39.9161, lng: 116.3969 },
  { id: 'i9', name: '楼梯', type: 'stairs', floor: 2, building: '教学楼A', lat: 39.9162, lng: 116.3966 },
  // 三楼
  { id: 'i10', name: '电梯', type: 'elevator', floor: 3, building: '教学楼A', lat: 39.9162, lng: 116.3967 },
  { id: 'i11', name: '301会议室', type: 'room', floor: 3, building: '教学楼A', lat: 39.9161, lng: 116.3968 },
  { id: 'i12', name: '302办公室', type: 'room', floor: 3, building: '教学楼A', lat: 39.9161, lng: 116.3969 }
];
