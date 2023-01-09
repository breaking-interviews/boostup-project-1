package com.codueon.boostUp.domain.suggest.feign;

import com.codueon.boostUp.domain.suggest.pay.KakaoPayReadyInfo;
import com.codueon.boostUp.domain.suggest.pay.KakaoPaySuccessInfo;
import com.codueon.boostUp.domain.suggest.pay.ReadyToKakaoPaymentInfo;
import com.codueon.boostUp.domain.suggest.pay.RequestForKakaoPaymentInfo;
import com.codueon.boostUp.domain.suggest.utils.PayConstants;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "kakaopay", url = "https://kapi.kakao.com", configuration = {FeignErrorConfig.class})
public interface KakaoPayFeignClient {

    @PostMapping(value = "/v1/payment/ready")
    KakaoPayReadyInfo readyForPayment(@RequestHeader(PayConstants.AUTHORIZATION) String authorization,
                                      @RequestHeader(PayConstants.ACCEPT) String accept,
                                      @RequestHeader(PayConstants.CONTENT_TYPE) String contentType,
                                      @SpringQueryMap ReadyToKakaoPaymentInfo params);

    @PostMapping(value = "/v1/payment/approve")
    KakaoPaySuccessInfo successForPayment(
            @RequestHeader(PayConstants.AUTHORIZATION) String authorization,
            @RequestHeader(PayConstants.ACCEPT) String accept,
            @RequestHeader(PayConstants.CONTENT_TYPE) String contentType,
            @SpringQueryMap RequestForKakaoPaymentInfo query);
}
