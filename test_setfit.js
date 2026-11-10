// 💥 파이프라인을 쓰지 않고 원시 환경(Raw Environment)에서 디버깅 진행
import { env, AutoTokenizer, AutoModel } from './transformers.js';

env.localModelPath = chrome.runtime.getURL('models/');
env.allowRemoteModels = false;
env.backends.onnx.wasm.numThreads = 1;

export async function debugSetFitModel() {
    console.log("🔍 [SetFit Debugger] 1. 디버깅 엔진 시동...");
    const sampleText = "손흥민 골 대박!! 토트넘 리버풀 경기 결과";
    
    try {
        // 1. 토크나이저 로드 검사
        console.log("🔍 [SetFit Debugger] 2. 토크나이저 로딩 시도...");
        const tokenizer = await AutoTokenizer.from_pretrained('.');
        console.log("✅ 토크나이저 로드 성공!");

        // 2. 텍스트 인코딩 결과 및 인풋 텐서 구조 출력
        console.log(`🔍 [SetFit Debugger] 3. 테스트 문장 인코딩 진행: "${sampleText}"`);
        const modelInputs = await tokenizer(sampleText);
        console.log("📋 모델 입력 텐서 Keys:", Object.keys(modelInputs));
        // SetFit의 경우 input_ids, attention_mask 외에 token_type_ids 구성 요소를 정밀 확인해야 함
        for (const key in modelInputs) {
            console.log(`   👉 Input [${key}] Shape: [${modelInputs[key].dims}]`);
        }

        // 3. 원시 ONNX 모델 로드 검사
        console.log("🔍 [SetFit Debugger] 4. 원시 ONNX 가중치 로딩 시도...");
        // pipeline 대신 AutoModel을 사용하여 래퍼 필터 없이 순수 가중치 노드 배치 파싱
        const model = await AutoModel.from_pretrained('.', { quantized: true });
        console.log("✅ ONNX 원시 모델 가중치 파싱 성공!");
        console.log("📋 모델 내부 정보(Config):", model.config);

        // 4. 추론(Forward Pass) 집행 및 아웃풋 레이어 구조 정밀 추적
        console.log("🔍 [SetFit Debugger] 5. 추론 연산(Forward Pass) 집행...");
        const startTime = performance.now();
        const modelOutputs = await model(modelInputs);
        const endTime = performance.now();
        
        console.log(`✅ 추론 연산 성공! (소요 시간: ${(endTime - startTime).toFixed(2)}ms)`);
        console.log("📋 모델 출력 텐서 Keys (여기서 복합 출력이 나오는지 확인):", Object.keys(modelOutputs));

        // 5. 텐서 데이터 구석구석 정밀 파싱
        for (const key in modelOutputs) {
            const tensor = modelOutputs[key];
            console.log(`📊 Output Node [${key}]:`);
            console.log(`   - Shape (차원 구조): [${tensor.dims}]`);
            console.log(`   - Data Type (타입): ${tensor.type}`);
            // 상위 10개 값만 추출하여 실제 스코어나 임베딩 벡터가 나오는지 검사
            console.log(`   - Sample Data (상위 10개):`, Array.from(tensor.data).slice(0, 10));
        }

    } catch (error) {
        console.error("❌ [SetFit Debugger Runtme Error] 디버깅 중 치명적 결함 포착:");
        console.error("📌 에러 메시지:", error.message);
        console.error("📌 에러 스택 트레이스:\n", error.stack);
    }
}