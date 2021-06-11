<template>
	<view class="container">
		<view class="logo">
			<image src="/static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="main">
			<view class="input-item">
				<text>服务企业</text>
				<u-input placeholder="请输入服务企业" :border="border" v-model="info.employers"></u-input>
			</view>
			<view class="input-item">
				<text>姓名</text>
				<u-input placeholder="请输入真实姓名" :border="border" v-model="info.name"></u-input>
			</view>
			<view class="input-item">
				<text>性别</text>
				<u-input :border="border" v-model="info.gender" placeholder="请输入性别" @click="showChoose('gender')" type="select" class="select-input"></u-input>
				<u-select v-model="genderShow" :list="genderList" @confirm="confirmChoose"></u-select>
			</view>
			<view class="input-item">
				<text>籍贯</text>
				<u-input :border="border" v-model="info.homeland" placeholder="请输入籍贯 如四川成都"></u-input>
			</view>
			<view class="input-item">
				<text>手机号码</text>
				<u-input :border="border" v-model="info.mobile" placeholder="请输入手机号码" disabled maxlength="11"></u-input>
				<view @click="openKeyboard('mobile')" class="input-mask"></view>
			</view>
			<view class="input-item">
				<text>身份证号码</text>
				<u-input :border="border" v-model="info.idNumber" placeholder="请输入身份证号码" disabled maxlength="18"></u-input>
				<view @click="openKeyboard('idNumber')" class="input-mask"></view>
			</view>
			<view class="input-item">
				<text>现住地址</text>
				<u-input :border="border" v-model="info.workerAddress" placeholder="请输入现住地址" disabled></u-input>
				<view @click="chooseAddress" class="input-mask"></view>
			</view>
			<view class="input-item">
				<text>紧急联系人</text>
				<u-input :border="border" v-model="info.emergency" placeholder="请输入紧急联系人"></u-input>
			</view>
			<view class="input-item">
				<text>紧急联系人电话</text>
				<u-input :border="border" v-model="info.emergencyCall" placeholder="请输入紧急联系人电话" disabled maxlength="11"></u-input>
				<view @click="openKeyboard('emergencyCall')" class="input-mask"></view>
			</view>
			<view class="input-item">
				<text>银行卡开户行</text>
				<u-input :border="border" v-model="info.bankName" placeholder="请输入开户行"></u-input>
			</view>
			<view class="input-item">
				<text>银行卡号</text>
				<u-input :border="border" v-model="info.bankNumber" placeholder="请输入银行卡号" disabled></u-input>
				<view @click="openKeyboard('bankNumber')" class="input-mask"></view>
			</view>
			<view class="input-item">
				<text>试用期</text>
				<u-input :border="border" v-model="info.tryTime" placeholder="请输入试用期" @click="showChoose('tryTime')" type="select" class="select-input"></u-input>
				<u-select v-model="tryTimeShow" :list="tryTimeList" @confirm="confirmChoose"></u-select>
			</view>
			<view class="input-item">
				<text>入职日期</text>
				<u-input :border="border" v-model="info.startTime" placeholder="请输入职日期" @click="showChoose('startTime')" type="select" class="select-input"></u-input>
				<u-calendar v-model="startTimeShow" mode="date" @change="confirmDate" safe-area-inset-bottom max-date="2100-01-01" :min-date="today"></u-calendar>
			</view>
			<view class="input-item">
				<text>到期日期</text>
				<u-input :border="border" v-model="info.endTime" placeholder="请输入合同到期日期" @click="showChoose('endTime')" type="select" class="select-input"></u-input>
				<u-calendar v-model="endTimeShow" mode="date" @change="confirmDate" safe-area-inset-bottom max-date="2100-01-01" :min-date="today"></u-calendar>
			</view>
			<view class="input-item">
				<text>从事岗位</text>
				<u-input :border="border" v-model="info.work" placeholder="请输入从事岗位" maxlength="4"></u-input>
			</view>
			<view class="input-item">
				<text>服务门店</text>
				<u-input :border="border" v-model="info.shop" placeholder="请输入服务门店" maxlength="6"></u-input>
			</view>
			<view class="input-item">
				<text>综合工资</text>
				<u-input :border="border" v-model="info.salary" placeholder="请输入综合薪资" type="number"></u-input>
			</view>
		</view>
		<view class="footer">
			<u-button class="custom-style" type="success" @click="submit">提交</u-button>
		</view>
		<u-toast ref="uToast" />
		<u-keyboard ref="uKeyboard" :mode="keyboardMode" v-model="keyboardShow" @change="valChange" @backspace="backspace" :mask="false" :dot-enabled="false" @confirm="confirmInput" :cancel-btn="false" :safe-area-inset-bottom="true"></u-keyboard>
		<u-modal v-model="show" :content="content" @confirm="confirm" @cancel='cancel' :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				genderShow: false,
				tryTimeShow: false,
				startTimeShow: false,
				endTimeShow: false,
				keyboardShow: false,
				keyboardMode: 'number',
				currentChoose: '',
				today: '',
				readOnly: true,
				show: false,
				content: '本人郑重承诺以上内容属实',
				border: true,
				info: {
					name: '',
					employers: '',
					mobile: '',
					gender: '',
					homeland: '',
					workerAddress: '',
					idNumber: '',
					emergency: '',
					emergencyCall: '',
					bankName: '',
					bankNumber: '',
					tryTime: '',
					startTime: '',
					work: '',
					endTime: '',
					shop: '',
					salary: ''
				},
				genderList: [
					{
						value: 'gender',
						label: '男'
					},
					{
						value: 'gender',
						label: '女'
					}
				],
				tryTimeList: [],
			};
		},
		mounted() {
			this.initTry()
			this.initDate()
		},
		methods: {
			confirm() {
				this.goSign()
			},
			initTry() {
				for (let index = 1; index <= 12; index++) {
					this.tryTimeList.push({
						value: 'tryTime',
						label: `${index}个月`
					})
				}
			},
			initDate() {
				const date = new Date()
				this.today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
			},
			submit() {
				let count = 0
				for (const key in this.info) {
					if (this.info.hasOwnProperty(key)) {
						const element = this.info[key];
						if (!element) {
							count += 1
						}
					}
				}
				if (count !== 0) {
					this.showToast()
					return
				}
				this.show = true
			},
			cancel() {
				this.show = false
			},
			goSign() {
				uni.showLoading({
					title: '加载中'
				});
				const data = {};
				const info = this.info
				for (const key in info) {
					if (Object.hasOwnProperty.call(info, key)) {
						const element = info[key];
						data[key] = element
					}
				}
				uni.request({
					url: 'https://www.zhinimei.cn/workSign',
					method: 'POST',
					data,
					success: (res) => {
						console.log(res?.data);
						window.location.href = res?.data?.signUrl
						uni.hideLoading();
					},
					fail: (res) => {
						uni.hideLoading();
						console.log(res)
						this.$refs.uToast.show({
							title: res,
							type: 'error',
						})
					}
				});
			},
			showToast() {
				this.$refs.uToast.show({
					title: '请填写完整',
					type: 'error',
				})
			},
			chooseAddress() {
				uni.chooseLocation({
					success: (res) => {
						const { address } = res;
						this.info.workerAddress = address
					}
				});
			},
			showChoose(event) {
				this.currentChoose = event
				this[`${event}Show`] = true
			},
			confirmChoose(event) {
				this.info[event[0]?.value] = event[0]?.label
			},
			confirmDate(event) {
				this.info[this.currentChoose] = event.result
			},
			confirmInput() {
				const currentChoose = this.currentChoose
				if (currentChoose === 'mobile' || currentChoose === 'emergencyCall') {
					this.isPhone(currentChoose)
				} else if (currentChoose === 'idNumber') {
					this.isIdCard(currentChoose)
				}
			},
			openKeyboard(event) {
				this.keyboardShow = true
				this.currentChoose = event
				if (event === 'idNumber') {
					this.keyboardMode = "card"
					return
				}
				this.keyboardMode = "number"
			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.info[this.currentChoose] += val;
			},
			// 退格键被点击
			backspace() {
				const currentChoose = this.currentChoose
				const info = this.info
				// 删除value的最后一个字符
				if (info[currentChoose].length) {
					info[currentChoose] = info[currentChoose].substr(0, info[currentChoose].length - 1)
				}
			},
			isPhone(event) {
				if (!this.$u.test.mobile(this.info[event])) {
					this.$refs.uToast.show({
						title: '手机号格式错误',
						type: 'error',
					})
					this.info[event] = ''
				}
			},
			isIdCard(event) {
				if (!this.$u.test.idCard(this.info[event])) {
					this.$refs.uToast.show({
						title: '身份证号格式错误',
						type: 'error',
					})
					this.info[event] = ''
				}
			}
		},
	};
</script>

<style lang="scss">
	.select-input {
		width: 340upx;
	}
	.container {
		width: 750upx;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo {
			height: 300rpx;
			width: 300rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input-item {
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #eeeeee;
		position: relative;
		width: 686rpx;
		text {
			width: 230rpx;
		}
		.input-mask {
			width: 340rpx;
			height: 70rpx;
			position: absolute;
			right: 0;
		}
	}

	.bottom {
		width: 750rpx;
		height: 208rpx;
		position: fixed;
		bottom: 0;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.custom-style {
		margin-top: 50rpx;
		width: 686rpx;
		margin-bottom: 50rpx;
	}
</style>