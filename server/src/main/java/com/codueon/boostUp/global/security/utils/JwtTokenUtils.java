package com.codueon.boostUp.global.security.utils;

import com.codueon.boostUp.domain.member.entity.Member;
import com.codueon.boostUp.domain.member.exception.AuthException;
import com.codueon.boostUp.global.exception.ExceptionCode;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtils {
    private static final String BEARER = "Bearer";
    @Getter
    private final String secretKey;

    @Getter
    private final int accessTokenExpirationsMinutes;

    @Getter
    private final int refreshTokenExpirationMinutes;


    public JwtTokenUtils(@Value("${jwt.secret-key}") String secretKey,
                         @Value("${jwt.access-token-expiration-minutes}") int accessTokenExpirationsMinutes,
                         @Value("${jwt.refresh-token-expiration-minutes}") int refreshTokenExpirationMinutes) {
        this.secretKey = secretKey;
        this.accessTokenExpirationsMinutes = accessTokenExpirationsMinutes;
        this.refreshTokenExpirationMinutes = refreshTokenExpirationMinutes;
    }

    /**
     * 엑세스 토큰 발급
     *
     * @param member
     * @return
     */
    public String generateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());

        String subject = member.getEmail();
        Date expiration = getTokenExpiration(getAccessTokenExpirationsMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * 리프레시 토큰 발급
     *
     * @param member
     * @return
     */
    public String generateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * 서버 환경변수 시크릿 키를 인코딩하여 변환해주는 메서드
     *
     * @param secretKey 시크릿 키
     * @return 인코딩된 시크릿 키
     * @author LimJaeminZ
     */
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * base64로 인코딩 된 key -> Key 객체 변환 메서드
     *
     * @param base64EncodedSecretKey base64로 인코딩 된 key
     * @return Key
     */
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    /**
     * 토큰 만료시간 반환 메서드
     *
     * @param expirationMinutes 서버 저장 엑세서 토큰 만료 시간
     * @return Date
     */
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        return calendar.getTime();
    }

    /**
     * 검증 후 JWS 반환
     *
     * @param jws
     * @return
     */
    public Map<String, Object> getClaims(String jws) {
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build().parseClaimsJwt(jws).getBody();
    }

    public String parseAccessToken(String accessToken) {
        if(accessToken.startsWith(BEARER))
            return accessToken.split(" ")[1];
        throw new AuthException(ExceptionCode.INVALID_AUTH_TOKEN);
    }
}
