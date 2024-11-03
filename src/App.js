import {IOHandler} from "./utils/IOHandler.js";
import {INSTRUCTION} from "./constants/constants.js";
import {purchasePriceUtils} from "./utils/purchasePrice.utils.js";
import {Console} from '@woowacourse/mission-utils'
import {lottoUtils} from "./utils/lotto.utils.js";
import {validator} from "./validation/validator.js";

class App {
    async run() {
        try {
            const purchasePrice = await IOHandler.getInput(INSTRUCTION.GET_PURCHASE_PRICE, validator.purchasePrice.validate);
            const lottoAmount = purchasePriceUtils.getLottoAmount(purchasePrice);
            Console.print(INSTRUCTION.PRINT_LOTTO_AMOUNT(lottoAmount));

            const lottos = lottoUtils.generateNLottos(lottoAmount);
            lottos.map((lotto) => {
                lotto.print()
            })

            const winningNumbers = await IOHandler.getInput(INSTRUCTION.GET_WINNING_NUMBERS, validator.winningNumbers.validate, (str) => str.split(','));
            const bonusNumber = await IOHandler.getInput(INSTRUCTION.GET_BONUS_NUMBER, validator.bonusNumbers.validate);
                (str) => str.split(','));

                validator.bonusNumbers.validate);
            validator.bonusNumbers.validateWithWinningNumbers(bonusNumber, winningNumbers);

            const lottoResult = lottoUtils.getLottoMatchResultArray(lottos, winningNumbers, bonusNumber);

            let totalPrize = 0;
            Console.print(INSTRUCTION.PRINT_TOTAL_WINNING_STATISTICS);
            lottoResult.forEach((amount, index) => {
                lottoUtils.printWinningStatistics(index, lottoUtils.getPrize(index), amount)
                totalPrize += amount * lottoUtils.getPrize(index);
            })
            const profitRate = lottoUtils.calculateProfitRate(totalPrize, purchasePrice);
            Console.print(INSTRUCTION.PRINT_PROFIT_RATE(profitRate))

        } catch (error) {
            Console.print(error.message)
        }
    }
}

export default App;