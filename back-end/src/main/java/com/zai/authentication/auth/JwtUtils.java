package com.zai.authentication.auth;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    public static final String HEADER = "Authorization";
    public static final String PREFIX = "Bearer ";

    private final int tokenValidity;
    private final String jwtSecret;

    public JwtUtils(@Value("defaultSecretJwtSignature") String jwtSecret,
                    @Value("1200000") int jwtExpirationMs) {
        this.jwtSecret = jwtSecret;
        this.tokenValidity = jwtExpirationMs;
    }

    public String generateJwtToken(Authentication authentication) {
        MyUserDetails userPrincipal = (MyUserDetails) authentication.getPrincipal();
        return PREFIX +
                Jwts.builder()
                        .setSubject((userPrincipal.getEmail()))
                        .setIssuedAt(new Date())
                        .setExpiration(new Date((new Date()).getTime() + tokenValidity))
                        .signWith(SignatureAlgorithm.HS512, jwtSecret)
                        .compact();
    }

    public String getEmailJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}

