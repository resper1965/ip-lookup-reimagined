# 🌐 n.Network

**Autor:** Ricardo Esper  
**Organização:** NESS · Segurança da Informação

---

## 📡 Sobre o projeto

**n.Network** é uma aplicação leve e acessível voltada à **verificação de conectividade e visibilidade de redes públicas**. Sua principal função é permitir que qualquer usuário valide rapidamente:

- Se a conexão de rede está ativa.
- Qual o endereço IP público atribuído.
- Qual região, ASN e provedor estão sendo utilizados.
- Se o acesso passa por proxies ou filtros geográficos.

---

## 🚀 Como funciona

Ao acessar a interface da aplicação, o usuário obtém instantaneamente:

- Seu IP público atual.
- Informações de geolocalização (país, cidade, latitude e longitude).
- Nome da operadora, ASN e tipo de rede.
- Dados úteis para diagnóstico de VPNs, WAFs ou bloqueios por localização.

Essas informações são processadas com base em chamadas públicas a APIs confiáveis de geolocalização e análise de rede, sem armazenar dados do usuário.

---

## 🔐 Aplicações práticas

- Suporte técnico remoto: validação de conectividade do cliente.
- Testes de roteamento, latência ou CDN.
- Verificação de bloqueios regionais.
- Ambientes com políticas de segurança ou proxy avançado.

---

## 🛠️ Tecnologias utilizadas

- Node.js com Vite
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Docker (para execução e empacotamento)

---

Este projeto faz parte da iniciativa de ferramentas públicas da unidade **Trustness** da NESS, promovendo visibilidade e confiabilidade no ecossistema de redes seguras.

